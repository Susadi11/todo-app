// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Manage the current authenticated user
  const [loading, setLoading] = useState(true); // Flag to check if the user is loading

  // Load the user from localStorage on app initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);  // Set loading to false after checking for the user
  }, []);

  // Register a new user and store them in localStorage
  const register = (name, email, password) => {
    const newUser = { id: Date.now(), name, email, password };

    // Retrieve any existing users
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user to the users array
    users.push(newUser);

    // Store the updated users array in localStorage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser)); // Store the logged-in user
    setUser(newUser);
  };

  // Login a user by checking if the email and password match any existing user
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user with the matching email and password
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));  // Store the logged-in user
      setUser(foundUser);
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    // Clear the logged-in user data from localStorage
    localStorage.removeItem('loggedInUser');
    
    // Update state to reflect the user is logged out
    setUser(null);
  };
  

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
