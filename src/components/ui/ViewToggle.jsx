import React from 'react';
import { Squares2X2Icon, ListBulletIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

const ViewToggle = ({ viewMode, setViewMode }) => {
    return (
        <div className="flex bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg">
            <button
                onClick={() => setViewMode('grid')}
                className={clsx(
                    "p-2 rounded-md transition-all duration-200",
                    viewMode === 'grid'
                        ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                )}
                title="Grid View"
            >
                <Squares2X2Icon className="w-5 h-5" />
            </button>
            <button
                onClick={() => setViewMode('list')}
                className={clsx(
                    "p-2 rounded-md transition-all duration-200",
                    viewMode === 'list'
                        ? "bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                )}
                title="List View"
            >
                <ListBulletIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default ViewToggle;
