import { createContext, useState } from 'react';
import PropTypes from 'prop-types';


export const AuthContext = createContext(null);


const inMemoryUsers = [];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
   
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });

  const signup = (email, username, password) => {
   
    if (inMemoryUsers.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }
   
    const newUser = { id: Date.now(), email, username, password };
    inMemoryUsers.push(newUser);

   
    const sessionUser = { id: newUser.id, email, username };
    localStorage.setItem('auth_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const login = (email, password) => {
   
    const found = inMemoryUsers.find(
      u => u.email === email && u.password === password
    );
    if (!found) throw new Error('Invalid email or password');

    
    const sessionUser = { id: found.id, email: found.email, username: found.username };
    localStorage.setItem('auth_user', JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = { children: PropTypes.node.isRequired };