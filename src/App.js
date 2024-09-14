// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TodoProvider } from './context/TodoContext';
import { AuthProvider } from './context/AuthContext';
import TodoPage from './pages/TodoPage';
import EditTodoPage from './pages/EditTodoPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute

const App = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <div>
            <Routes>
              {/* Public routes */}
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* Protected routes */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <TodoPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <PrivateRoute>
                    <EditTodoPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;
