// src/pages/RegisterPage.js
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegisterPage = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to the todo page
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <h2 className="text-lg font-medium mb-6 text-gray-900">Register</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          register(values.name, values.email, values.password);
          navigate('/login'); // Redirect to login after registration
        }}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">Name</label>
            <Field name="name" className="w-full px-4 py-2 border border-gray-400 rounded-lg" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

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

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;
