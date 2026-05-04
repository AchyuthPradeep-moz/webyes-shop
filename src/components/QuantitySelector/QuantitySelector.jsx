import PropTypes from 'prop-types';
import './QuantitySelector.css';

const QuantitySelector = ({ quantity, onChange }) => {
  const decrement = (e) => {
    if (e) e.stopPropagation();
    if (quantity > 1) onChange(quantity - 1);
  };

  const increment = (e) => {
    if (e) e.stopPropagation();
    onChange(quantity + 1);
  };

  return (
    <div className="qty-selector">
      <button
        className="qty-btn"
        onClick={decrement}
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
      >
       -
      </button>
      <span className="qty-value">{quantity}</span>
      <button
        className="qty-btn"
        onClick={increment}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default QuantitySelector;