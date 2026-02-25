import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { logout } from '../../features/auth/authSlice';
import useTheme from '../../hooks/useTheme';

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="fixed top-0 right-0 left-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 z-10 transition-colors">
      <div className="flex items-center justify-between h-16 px-4 sm:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 lg:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Platform</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white leading-tight">Library Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-6 h-6 text-yellow-500" />
            ) : (
              <MoonIcon className="w-6 h-6 text-indigo-600" />
            )}
          </button>

          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-black text-gray-900 dark:text-white leading-tight">{user?.name}</span>
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{user?.role}</span>
          </div>

          <button
            onClick={() => navigate('/profile')}
            className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center border-2 border-indigo-100 dark:border-indigo-800/50 hover:border-indigo-500 transition-all group"
          >
            <div className="text-indigo-600 dark:text-indigo-400 font-black">
              {user?.name?.[0]}
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Logout"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
