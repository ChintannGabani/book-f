import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: 'student',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, 'Must be at least 3 characters').required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Must be at least 6 characters').required('Password is required'),
      role: Yup.string().oneOf(['manager', 'student']).required('Role is required'),
    }),
    onSubmit: async (values) => {
      const result = await dispatch(register(values));
      if (!result.error) {
        navigate('/login');
      }
    },
  });

  return (
    <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900 dark:text-white tracking-tight">
        LMS Registration
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <Input
          id="name"
          label="Full Name"
          placeholder="Enter your name"
          {...formik.getFieldProps('name')}
          error={formik.touched.name && formik.errors.name}
        />

        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && formik.errors.email}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && formik.errors.password}
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Role
          </label>
          <select
            id="role"
            {...formik.getFieldProps('role')}
            className={`block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none transition-all shadow-sm ${formik.touched.role && formik.errors.role ? 'border-rose-500' : 'hover:border-gray-300 dark:hover:border-gray-600'
              }`}
          >
            <option value="student">Student</option>
            <option value="manager">Library Manager</option>
          </select>
          {formik.touched.role && formik.errors.role && (
            <p className="text-xs font-bold text-rose-500 ml-1 mt-1">{formik.errors.role}</p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Already have an account? Sign in
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-4 text-lg font-black shadow-lg shadow-indigo-200 dark:shadow-none transform transition-all active:scale-[0.98]"
          isLoading={loading}
        >
          Create Account
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
