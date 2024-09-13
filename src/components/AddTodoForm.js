import React from 'react';
import { useTodos } from '../context/TodoContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(5, 'Description must be at least 5 characters')
    .required('Description is required'),
});

const AddTodoForm = () => {
  const { addTodo } = useTodos();

  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      validationSchema={TodoSchema}
      onSubmit={(values, { resetForm }) => {
        addTodo(values.title, values.description);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <Field
              name="title"
              type="text"
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="mb-4">
            <Field
              name="description"
              type="text"
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Todo
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTodoForm;
