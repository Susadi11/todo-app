// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@mdi/react';  // Import Icon from @mdi/react
import { mdiEye, mdiEyeOff } from '@mdi/js';  // Import Material Community Icons

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-16">
      <h2 className="text-2xl font-medium mb-4 text-black">Login</h2>
      <p className="text-gray-600 mb-6 text-sm">Welcome! So good to have you back!</p>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          const success = await login(values.email, values.password);
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
            <Field 
              name="email" 
              type="email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" 
              placeholder="youremail@domain.com"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">Password</label>
            <div className="relative">
              <Field 
                name="password" 
                type={passwordVisible ? "text" : "password"} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" 
                placeholder="***********"
              />
              <div 
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 border-l border-gray-300 cursor-pointer" 
                onClick={togglePasswordVisibility}
              >
                <Icon 
                  path={passwordVisible ? mdiEyeOff : mdiEye} 
                  size={1} 
                  color="currentColor" 
                />
              </div>
            </div>
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Login
          </button>
        </Form>
      </Formik>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-gray-800 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;