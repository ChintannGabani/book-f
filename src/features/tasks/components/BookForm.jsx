import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, updateBook } from '../store/bookSlice';
import { fetchCategories } from '../store/categorySlice';
import { useNavigate, useParams } from 'react-router-dom';
import {
    PencilIcon,
    Bars3BottomLeftIcon,
    CurrencyDollarIcon,
    TagIcon,
    ArchiveBoxIcon,
    PhotoIcon,
    ArrowLeftIcon,
    UserIcon,
    HashtagIcon
} from '@heroicons/react/24/outline';

const FormInput = ({ label, name, type, value, onChange, icon: Icon, placeholder, required = true, min, max, step }) => (
    <div className="space-y-1.5">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            {label}
        </label>
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 text-gray-400">
                <Icon className="h-5 w-5" />
            </div>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none transition-all shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
            />
        </div>
    </div>
);

const BookForm = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { books, loading: bookLoading } = useSelector((state) => state.book);
    const { categories, loading: categoryLoading } = useSelector((state) => state.category);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        description: '',
        price: '0',
        category: '',
        stock: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
        if (id) {
            const book = books.find(p => p._id === id);
            if (book) {
                setFormData({
                    title: book.title,
                    author: book.author || '',
                    isbn: book.isbn || '',
                    description: book.description,
                    price: book.price,
                    category: book.category?._id || book.category,
                    stock: book.stock,
                });
                if (book.image) {
                    setPreviewUrl(`http://localhost:8000/temp/${book.image}`);
                }
            }
        }
    }, [id, books, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('author', formData.author);
        data.append('isbn', formData.isbn);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('stock', formData.stock);
        if (imageFile) {
            data.append('image', imageFile);
        }

        let result;
        if (id) {
            result = await dispatch(updateBook({ id, bookData: data }));
        } else {
            result = await dispatch(addBook(data));
        }

        if (!result.error) {
            navigate('/books');
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-6">
            <button
                onClick={() => navigate('/books')}
                className="flex items-center text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors mb-8 group"
            >
                <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Library
            </button>

            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-10 text-white">
                    <h2 className="text-3xl font-black tracking-tight">{id ? 'Edit Book' : 'Add New Book'}</h2>
                    <p className="text-indigo-100 mt-2 font-medium opacity-90">
                        {id ? 'Update book details and availability.' : 'Add a new volume to your library collection.'}
                    </p>
                </div>

                <div className="px-8 py-10">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <FormInput
                            label="Book Title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            icon={PencilIcon}
                            placeholder="e.g. The Great Gatsby"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormInput
                                label="Author"
                                name="author"
                                type="text"
                                value={formData.author}
                                onChange={handleChange}
                                icon={UserIcon}
                                placeholder="e.g. F. Scott Fitzgerald"
                            />
                            <FormInput
                                label="ISBN (Optional)"
                                name="isbn"
                                type="text"
                                value={formData.isbn}
                                onChange={handleChange}
                                icon={HashtagIcon}
                                placeholder="e.g. 978-3-16-148410-0"
                                required={false}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                Summary / Description
                            </label>
                            <div className="relative group">
                                <div className="absolute top-3 left-3.5 text-gray-400 group-focus-within:text-indigo-600">
                                    <Bars3BottomLeftIcon className="h-5 w-5" />
                                </div>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    placeholder="Provide a detailed summary of the book..."
                                    rows="4"
                                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none transition-all"
                                ></textarea>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormInput
                                label="Price ($ / Rental)"
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                icon={CurrencyDollarIcon}
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                            />
                            <FormInput
                                label="Available Copies"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                icon={ArchiveBoxIcon}
                                placeholder="0"
                                min="0"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                    Category
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                                        <TagIcon className="h-5 w-5" />
                                    </div>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none appearance-none"
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                                    Book Cover Image
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                                            <PhotoIcon className="h-5 w-5" />
                                        </div>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            required={!id}
                                            className="block w-full pl-11 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
                                        />
                                    </div>
                                    {previewUrl && (
                                        <div className="h-14 w-14 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
                                            <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 flex items-center gap-4">
                            <button
                                type="submit"
                                disabled={bookLoading}
                                className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200/50 transform active:scale-[0.98] transition-all disabled:opacity-50"
                            >
                                {id ? 'Update Book' : 'Add Book'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/books')}
                                className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-2xl font-bold hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookForm;
