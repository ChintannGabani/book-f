import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileView = ({
    formik,
    loading,
    user
}) => {
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white tracking-tight">
                Admin Profile
            </h2>

            <div className="bg-white dark:bg-gray-800 p-10 rounded-[2rem] shadow-xl border border-gray-100 dark:border-gray-700">
                <form onSubmit={formik.handleSubmit} className="space-y-8">

                    <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 pb-8 border-b border-gray-100 dark:border-gray-700">
                        <div className="h-24 w-24 rounded-3xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center border-2 border-indigo-100 dark:border-indigo-800/50 shadow-inner">
                            <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 uppercase">
                                {user?.name?.[0]}
                            </span>
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || 'Admin'}</h3>
                            <p className="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-xs tracking-widest">{user?.role}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                Authorized Personnel Only
                            </span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Input
                            id="name"
                            label="Name"
                            placeholder="Admin Name"
                            {...formik.getFieldProps('name')}
                            error={formik.touched.name && formik.errors.name}
                        />

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formik.values.email}
                                disabled
                                className="block w-full rounded-xl border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 shadow-sm sm:text-sm py-3 px-4 cursor-not-allowed font-medium"
                            />
                            <p className="text-xs text-gray-400 mt-2 ml-1 font-bold italic">Note: Admin credentials are managed by the system administrator.</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-end pt-6">
                        <Button
                            type="submit"
                            isLoading={loading}
                            variant="primary"
                            className="px-10 py-4 shadow-lg shadow-indigo-100 dark:shadow-none transform active:scale-95"
                            disabled
                        >
                            Update Profile
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileView;
