import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/Layout';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import Dashboard from '../pages/Dashboard';
import BookList from '../features/tasks/containers/BookList.container';
import BookForm from '../features/tasks/components/BookForm';
import Profile from '../features/profile/containers/Profile.container';
import CategoryList from '../features/tasks/views/CategoryList.view';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="books" element={<BookList />} />
        <Route path="books/add" element={<BookForm />} />
        <Route path="books/edit/:id" element={<BookForm />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
