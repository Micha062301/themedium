// src/components/Header.jsx
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="border-b border-medium-border sticky top-0 bg-white z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to="/" aria-label="Medium homepage">
            <svg viewBox="0 0 1043.63 592.71" className="w-10 h-10">
              <g data-name="Layer 2">
                <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" fill="#000"/>
              </g>
            </svg>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link 
            to="/"
            className="text-medium-black hover:text-medium-green transition-colors duration-200 hidden md:inline-block"
            aria-label="Home"
          >
            Home
          </Link>
          <Link 
            to="/topics"
            className="text-medium-black hover:text-medium-green transition-colors duration-200 hidden md:inline-block"
            aria-label="Topics"
          >
            Our Story
          </Link>
          <Link 
            to="/membership"
            className="text-medium-black hover:text-medium-green transition-colors duration-200 hidden md:inline-block"
            aria-label="Membership"
          >
            Membership
          </Link>
          <div className="relative ml-2">
            {user ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                  aria-label="User menu"
                  aria-expanded={showDropdown}
                  aria-haspopup="true"
                >
                  <img
                    src={user.profileImage || '/default-avatar.png'}
                    alt={`${user.name}'s profile`}
                    className="w-8 h-8 rounded-full border border-medium-border"
                  />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-medium-border">
                    <Link
                      to={`/profile/${user._id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/new-story"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Write a story
                    </Link>
                    <Link
                      to="/stats"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Stats
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-medium-black hover:text-medium-green transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-medium-green text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-200"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
