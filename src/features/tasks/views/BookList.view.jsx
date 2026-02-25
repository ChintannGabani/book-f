import React from 'react';
import {
    TrashIcon,
    PencilSquareIcon,
    FunnelIcon,
    PlusIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const BookListView = ({
    books,
    categories = [],
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    stockFilter,
    setStockFilter,
    sortBy,
    setSortBy,
    pagination,
    onPageChange,
    handleDelete,
    navigate,
    userRole
}) => {
    const isManager = userRole === 'manager';

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Library Catalog</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Browse and manage available books.</p>
                </div>
                {isManager && (
                    <button
                        onClick={() => navigate('/books/add')}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl font-black transform active:scale-95"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add Book
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
                <div className="lg:col-span-4 relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <MagnifyingGlassIcon className="h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-5 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm transition-all font-medium"
                    />
                </div>

                <div className="lg:col-span-3 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <FunnelIcon className="h-5 w-5" />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full pl-12 pr-10 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none transition-all font-bold shadow-sm"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="lg:col-span-3 relative">
                    <select
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value)}
                        className="w-full pl-5 pr-10 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none transition-all font-bold shadow-sm"
                    >
                        <option value="all">Any Availability</option>
                        <option value="in">Available</option>
                        <option value="out">Borrowed/Out</option>
                    </select>
                </div>

                <div className="lg:col-span-2 relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full pl-5 pr-10 py-4 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none transition-all font-bold shadow-sm"
                    >
                        <option value="createdAt-desc">Newest First</option>
                        <option value="title-asc">Title: A-Z</option>
                    </select>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700/50">
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Book Details</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                {isManager && (
                                    <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                            {books.length === 0 ? (
                                <tr>
                                    <td colSpan={isManager ? 4 : 3} className="px-6 py-20 text-center">
                                        <ExclamationTriangleIcon className="h-10 w-10 text-amber-400 mx-auto mb-4" />
                                        <p className="text-gray-500 dark:text-gray-400 font-bold text-xl">No books found.</p>
                                    </td>
                                </tr>
                            ) : (
                                books.map((book) => (
                                    <tr key={book._id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={book.image ? `http://localhost:8000/temp/${book.image}` : 'https://via.placeholder.com/150'}
                                                    alt={book.title}
                                                    className="w-12 h-16 rounded-lg object-cover border border-gray-100 dark:border-gray-600 shadow-sm"
                                                />
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white leading-tight">{book.title}</p>
                                                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">{book.author}</p>
                                                    <p className="text-xs text-gray-400 mt-1 line-clamp-1 max-w-[200px]">{book.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 rounded-lg">
                                                {book.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-xs font-bold">
                                            {book.stock > 0 ? (
                                                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full">
                                                    Available ({book.stock})
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full">
                                                    Borrowed Out
                                                </span>
                                            )}
                                        </td>
                                        {isManager && (
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => navigate(`/books/edit/${book._id}`)}
                                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all"
                                                    >
                                                        <PencilSquareIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(book._id)}
                                                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {pagination.totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-2">
                    <button
                        onClick={() => onPageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className="p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 disabled:opacity-30 transition-all hover:bg-gray-50 shadow-sm"
                    >
                        <ChevronLeftIcon className="h-5 w-5" />
                    </button>

                    {[...Array(pagination.totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => onPageChange(i + 1)}
                            className={`w-12 h-12 rounded-2xl font-black transition-all shadow-sm ${pagination.currentPage === i + 1 ? 'bg-indigo-600 text-white scale-110' : 'bg-white dark:bg-gray-800 text-gray-400 hover:text-indigo-600 border border-gray-100 dark:border-gray-700'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => onPageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className="p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 disabled:opacity-30 transition-all hover:bg-gray-50 shadow-sm"
                    >
                        <ChevronRightIcon className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookListView;
