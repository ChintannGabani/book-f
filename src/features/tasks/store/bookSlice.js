import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../api/axios';
import { toast } from 'react-toastify';

export const fetchBooks = createAsyncThunk(
    'book/fetchBooks',
    async (params, { rejectWithValue }) => {
        try {
            const response = await API.get('/books', { params });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch books');
        }
    }
);

export const addBook = createAsyncThunk(
    'book/addBook',
    async (bookData, { rejectWithValue }) => {
        try {
            const response = await API.post('/books', bookData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add book');
        }
    }
);

export const updateBook = createAsyncThunk(
    'book/updateBook',
    async ({ id, bookData }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/books/${id}`, bookData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update book');
        }
    }
);

export const deleteBook = createAsyncThunk(
    'book/deleteBook',
    async (id, { rejectWithValue }) => {
        try {
            await API.delete(`/books/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete book');
        }
    }
);

const initialState = {
    books: [],
    pagination: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10
    },
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        clearBookError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Books
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload.books;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Book
            .addCase(addBook.fulfilled, (state, action) => {
                state.books.unshift(action.payload);
                toast.success('Book added successfully');
            })
            // Update Book
            .addCase(updateBook.fulfilled, (state, action) => {
                const index = state.books.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.books[index] = action.payload;
                }
                toast.success('Book updated successfully');
            })
            // Delete Book
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter(p => p._id !== action.payload);
                toast.success('Book deleted successfully');
            });
    }
});

export const { clearBookError } = bookSlice.actions;
export default bookSlice.reducer;
