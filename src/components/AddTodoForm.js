import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTodos } from '../context/TodoContext';

// Validation schema for adding a todo
const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(5, 'Description must be at least 5 characters')
    .required('Description is required'),
});

const AddTodoForm = () => {
  const { addTodo } = useTodos(); // Access addTodo function from context

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium mb-6 text-gray-900">Add Task</h2>
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
                    className="rounded-full bg-black px-4 py-1 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-black hover:outline hover:outline-2 hover:outline-black"
                  >
                    Add Task
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
