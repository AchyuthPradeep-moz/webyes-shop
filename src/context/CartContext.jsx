import { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';


export const CartContext = createContext(null);

export const itemKey = (item) =>
  `${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`;

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = itemKey(action.payload);
      const existing = state.items.find(i => itemKey(i) === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            itemKey(i) === key
              ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => itemKey(i) !== action.payload) };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => itemKey(i) !== action.payload.key) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          itemKey(i) === action.payload.key ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};


const initCart = () => {
  try {
    const saved = localStorage.getItem('cart_items');
    return saved ? { items: JSON.parse(saved) } : { items: [] };
  } catch {
    return { items: [] };
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, undefined, initCart);


  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product, quantity = 1) =>
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } });
  const removeItem = key => dispatch({ type: 'REMOVE_ITEM', payload: key });
  const updateQuantity = (key, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { key, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, itemKey, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = { children: PropTypes.node.isRequired };
