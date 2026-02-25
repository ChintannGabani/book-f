import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, deleteCategory, updateCategory } from '../store/categorySlice';
import { TrashIcon, PlusIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CategoryList = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.category);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            if (editId) {
                dispatch(updateCategory({ id: editId, categoryData: { name, description } }));
                setEditId(null);
            } else {
                dispatch(addCategory({ name, description }));
            }
            setName('');
            setDescription('');
        }
    };

    const handleEdit = (cat) => {
        setEditId(cat._id);
        setName(cat.name);
        setDescription(cat.description || '');
    };

    const cancelEdit = () => {
        setEditId(null);
        setName('');
        setDescription('');
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">Category Master</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add/Edit Category Form */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 h-fit">
                    <h2 className="text-xl font-bold mb-6">{editId ? 'Edit Category' : 'Add New Category'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Category Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Electronics"
                            required
                        />
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                                Description
                            </label>
                            <textarea
                                className="block w-full rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-3 px-4 transition-all"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Optional description"
                                rows={3}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button type="submit" variant="primary" className="flex-1" isLoading={loading}>
                                {editId ? <PencilSquareIcon className="h-5 w-5 mr-2" /> : <PlusIcon className="h-5 w-5 mr-2" />}
                                {editId ? 'Update' : 'Create'}
                            </Button>
                            {editId && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Category Table */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-gray-700">
                                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Name</th>
                                    <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Description</th>
                                    <th className="px-4 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                                {categories.map((cat) => (
                                    <tr key={cat._id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="px-4 py-5 font-bold text-sm text-gray-800 dark:text-gray-200">{cat.name}</td>
                                        <td className="px-4 py-5 text-sm text-gray-500 dark:text-gray-400">{cat.description || '-'}</td>
                                        <td className="px-4 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(cat)}
                                                    className="p-2 text-gray-400 hover:text-indigo-500 transition-colors"
                                                >
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => dispatch(deleteCategory(cat._id))}
                                                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {categories.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="px-4 py-10 text-center text-gray-500">No categories found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
