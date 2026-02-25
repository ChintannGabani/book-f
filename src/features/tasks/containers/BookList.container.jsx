import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, deleteBook } from '../store/bookSlice';
import { fetchCategories } from '../store/categorySlice';
import { useNavigate } from 'react-router-dom';
import BookListView from '../views/BookList.view';

const BookListContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { books, pagination, loading } = useSelector((state) => state.book);
    const { categories } = useSelector((state) => state.category);
    const { user } = useSelector((state) => state.auth);

    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [stockFilter, setStockFilter] = useState('all');
    const [sortBy, setSortBy] = useState('createdAt-desc');
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        const [sortField, sortOrder] = sortBy.split('-');
        dispatch(fetchBooks({
            page,
            limit: 10,
            search: searchQuery,
            category: categoryFilter,
            stock: stockFilter,
            sortBy: sortField,
            sortOrder: sortOrder
        }));
    }, [dispatch, page, searchQuery, categoryFilter, stockFilter, sortBy]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            dispatch(deleteBook(id));
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <BookListView
            books={books}
            categories={categories}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            stockFilter={stockFilter}
            setStockFilter={setStockFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            pagination={pagination}
            onPageChange={handlePageChange}
            handleDelete={handleDelete}
            navigate={navigate}
            isLoading={loading}
            userRole={user?.role}
        />
    );
};

export default BookListContainer;
