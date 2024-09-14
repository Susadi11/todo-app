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
    <div className="w-full max-w-lg mx-auto p-8">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium mb-6 text-gray-900">Edit Todo</h2>
        <Formik
          initialValues={{ title: todo.title, description: todo.description }}
          validationSchema={EditTodoSchema}
          onSubmit={(values) => {
            editTodo(todo.id, values.title, values.description);
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-1 gap-6">
                <div className="col-span-1">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">Title</label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-500"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="col-span-1">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                  <Field
                    name="description"
                    type="text"
                    placeholder="Description"
                    className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-gray-500"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-gray-300 px-4 py-1 hover:bg-gray-400 text-sm font-semibold text-gray-900"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-2 rounded-full bg-gray-300 px-4 py-1 hover:bg-gray-400 text-sm font-semibold text-gray-900"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditTodoForm;
