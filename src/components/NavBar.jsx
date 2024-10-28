import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-md flex space-x-4 items-center justify-center">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-200 ${isActive ? 'bg-gray-900' : ''}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition duration-200 ${isActive ? 'bg-gray-900' : ''}`
        }
      >
        Pastes
      </NavLink>
    </nav>
  );
}

export default NavBar;
