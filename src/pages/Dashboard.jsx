import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/tasks/store/bookSlice';
import {
  BookOpenIcon,
  ExclamationTriangleIcon,
  TagIcon,
  AcademicCapIcon,
  PlusIcon,
  UserIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.book);
  const { user } = useSelector((state) => state.auth);
  const isManager = user?.role === 'manager';

  useEffect(() => {
    dispatch(fetchBooks({ limit: 100 })); // Fetch more for stats
  }, [dispatch]);

  const stats = [
    {
      label: 'Total Books',
      value: books.length,
      color: 'bg-indigo-500',
      icon: <BookOpenIcon className="h-6 w-6" />
    },
    {
      label: 'Borrowed Out',
      value: books.filter(p => p.stock <= 0).length,
      color: 'bg-rose-500',
      icon: <ArchiveBoxIcon className="h-6 w-6" />
    },
    {
      label: 'Low Availability',
      value: books.filter(p => p.stock > 0 && p.stock < 5).length,
      color: 'bg-amber-500',
      icon: <ExclamationTriangleIcon className="h-6 w-6" />
    },
    {
      label: 'Genres / Categories',
      value: new Set(books.map(p => p.category?._id || p.category)).size,
      color: 'bg-emerald-500',
      icon: <TagIcon className="h-6 w-6" />
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Library Command Center
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          Welcome back, <span className="font-bold text-indigo-600 dark:text-indigo-400">{user?.name}</span>.
          Here is the library summary for today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl shadow-indigo-100/50 dark:shadow-none border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10 text-indigo-600 dark:text-indigo-400`}>
                {stat.icon}
              </div>
              <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900 dark:text-white mt-2">{loading ? '...' : stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recently Cataloged Books</h3>
            <Link to="/books" className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-4 py-2 rounded-lg transition-colors">
              Browse All &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Book Title</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Genre</th>
                  <th className="px-4 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
                {books.slice(0, 5).map(book => (
                  <tr key={book._id} className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-5 font-bold text-sm text-gray-800 dark:text-gray-200">{book.title}</td>
                    <td className="px-4 py-5 text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {book.category?.name || 'Uncategorized'}
                    </td>
                    <td className="px-4 py-5">
                      {book.stock > 0 ? (
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">Available</span>
                      ) : (
                        <span className="text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded">Out</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h4 className="text-lg font-bold mb-2">Library Operations</h4>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Ensure all volumes are correctly cataloged. Monitor borrowed books and update availability counts regularly.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h4>
            <div className="space-y-3">
              {isManager && (
                <>
                  <Link to="/books/add" className="flex items-center p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                    <PlusIcon className="h-5 w-5 mr-3 text-indigo-500" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Add New Book</span>
                  </Link>
                  <Link to="/categories" className="flex items-center p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                    <TagIcon className="h-5 w-5 mr-3 text-indigo-500" />
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Manage Genres</span>
                  </Link>
                </>
              )}
              <Link to="/profile" className="flex items-center p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
                <UserIcon className="h-5 w-5 mr-3 text-indigo-500" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Account Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
