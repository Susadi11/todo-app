import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTodos } from '../context/TodoContext'; // Make sure to import this

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
    <div className="w-full max-w-lg mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium mb-6">Add Todo</h2>
        <Formik
          initialValues={{ title: '', description: '' }}
          validationSchema={TodoSchema}
          onSubmit={(values, { resetForm }) => {
            addTodo(values.title, values.description);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-1 gap-6">
                <div className="col-span-1">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="col-span-1">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Field
                    name="description"
                    type="text"
                    placeholder="Description"
                    className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none"
                  >
                    Add Todo
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

export default AddTodoForm;
