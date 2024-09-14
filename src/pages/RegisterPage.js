// src/pages/RegisterPage.js
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Icon } from '@mdi/react';  // Import Icon from @mdi/react
import { mdiAccount, mdiEmail, mdiEye, mdiEyeOff } from '@mdi/js';  // Import Material Community Icons

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegisterPage = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();
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
    <div className="w-full max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-medium mb-6 text-black">Register</h2>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={async (values) => {
          await register(values.email, values.password);
          navigate('/login'); // Redirect to login after registration
        }}
      >
        <Form>
          <div className="mb-4 relative">
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">Name</label>
            <div className="relative">
              <Field 
                name="name" 
                className="w-full px-10 py-2 border border-gray-300 rounded-lg text-gray-900" 
                placeholder="Your Name"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 border-r border-gray-300">
                <Icon path={mdiAccount} size={1} color="currentColor" />
              </div>
            </div>
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <div className="relative">
              <Field 
                name="email" 
                type="email" 
                className="w-full px-10 py-2 border border-gray-300 rounded-lg text-gray-900" 
                placeholder="youremail@domain.com"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600 border-r border-gray-300">
                <Icon path={mdiEmail} size={1} color="currentColor" />
              </div>
            </div>
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">Password</label>
            <div className="relative">
              <Field 
                name="password" 
                type={passwordVisible ? "text" : "password"} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900" 
                placeholder="***********"
              />
              
              <div 
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" 
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

          <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Register
          </button>
        </Form>
      </Formik>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-gray-800 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
