import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Icons = {
  Menu: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  ),
  Close: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" />
    </svg>
  ),
  Logo: () => (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h2l1-2 2 4 1-2h2" />
    </svg>
  )
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = localStorage.getItem('userToken');
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const profilePic = storedUser.email ? localStorage.getItem(`userProfilePic_${storedUser.email}`) : null;
  const initials = (storedUser.email || storedUser.fullName || 'U')[0].toUpperCase();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
    window.location.reload();
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative px-1 py-2 text-sm font-bold tracking-tight transition-all duration-200 group ${isActive ? 'text-red-600' : 'text-slate-600 hover:text-red-600'
          }`}
      >
        {children}
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* BRANDING */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl shadow-red-200 ring-4 ring-red-50">
            <Icons.Logo />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black text-slate-900 tracking-tight">
              Life<span className="text-red-500">Line</span>
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink to="/">Home</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/request">Blood Request</NavLink>
              <NavLink to="/events">Events</NavLink>
            </>
          )}
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        {/* ACTIONS */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-red-600 transition-all shadow-xl shadow-slate-200"
            >
              Log In
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/profile"
                className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-200 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl overflow-hidden bg-red-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    initials
                  )}
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-red-600 transition-colors">Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-900"
        >
          {isMenuOpen ? <Icons.Close /> : <Icons.Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 transition-all duration-300 transform ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6 font-bold text-lg text-slate-700">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/request" onClick={() => setIsMenuOpen(false)}>Blood Request</Link>
              <Link to="/events" onClick={() => setIsMenuOpen(false)}>Events</Link>
            </>
          )}
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>

          <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="w-full py-4 bg-red-600 text-white rounded-2xl text-center shadow-lg shadow-red-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Link>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white font-black">
                    {initials}
                  </div>
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
