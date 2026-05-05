// FIX 8: Moved out of AuthContext.jsx so fast-refresh works correctly.
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => useContext(AuthContext);
