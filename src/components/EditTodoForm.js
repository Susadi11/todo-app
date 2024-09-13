import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTodos } from '../context/TodoContext';

const EditTodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(5, 'Description must be at least 5 characters')
    .required('Description is required'),
});

const EditTodoForm = ({ todo, onClose }) => {
  const { editTodo } = useTodos();

  return (
    <Formik
      initialValues={{ title: todo.title, description: todo.description }}
      validationSchema={EditTodoSchema}
      onSubmit={(values) => {
        editTodo(todo.id, values.title, values.description);
        onClose(); // Close the edit form
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
            Save Changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600 mt-2"
          >
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditTodoForm;
