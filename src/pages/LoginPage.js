// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // If user is already logged in, redirect to the todo page
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <h2 className="text-lg font-medium mb-6 text-gray-900">Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          const success = login(values.email, values.password);
          if (success) {
            navigate('/');  // Redirect to the todo page after login
          } else {
            setError('Invalid email or password');
          }
        }}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <Field name="email" type="email" className="w-full px-4 py-2 border border-gray-400 rounded-lg" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">Password</label>
            <Field name="password" type="password" className="w-full px-4 py-2 border border-gray-400 rounded-lg" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Login
          </button>
        </Form>
      </Formik>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
