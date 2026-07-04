import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
          onClick={() => setOpen(false)}
        >
          ComplaintHub
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-slate-700">
          <li>
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          </li>

          <li>
            <a href="#features" className="hover:text-blue-600 transition">
              Features
            </a>
          </li>

          <li>
            <Link to="/login" className="hover:text-blue-600 transition">
              Login
            </Link>
          </li>

          <li>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </li>
        </ul>

        {/* Mobile Icon */}
        <button
          className="md:hidden text-2xl text-slate-700"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden flex flex-col gap-1 px-6 pb-4 font-medium text-slate-700 border-t border-slate-100">
          <li>
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block py-3 hover:text-blue-600 transition"
            >
              Home
            </Link>
          </li>

          <li>
            <a
              href="#features"
              onClick={() => setOpen(false)}
              className="block py-3 hover:text-blue-600 transition"
            >
              Features
            </a>
          </li>

          <li>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block py-3 hover:text-blue-600 transition"
            >
              Login
            </Link>
          </li>

          <li>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="block bg-blue-600 text-white text-center px-5 py-3 rounded-lg hover:bg-blue-700 transition mt-1"
            >
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
