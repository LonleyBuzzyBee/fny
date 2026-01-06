import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/imgs/logoFNY.png';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

const Header = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const history = useHistory();
  const location = useLocation();

  const user = useSelector(state => state.currentUser);
  const isAdmin = useSelector(state => state.admin);
  const cart = useSelector(state => state.cart || []);
  const isLoggedIn = !!user;
  
  // Calculate total items in cart
  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const mainLinks = [
    { href: '/All', label: 'ALL PRODUCTS' },
    { href: '/Body', label: 'BODY' },
    { href: '/Face', label: 'FACE' },
    { href: '/Lips', label: 'LIPS' },
  ];

  // Get active link based on current route
  const getActiveLink = () => {
    const path = location.pathname;
    const link = mainLinks.find(l => l.href === path);
    return link ? link.href : '';
  };

  const activeLink = getActiveLink();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    history.push(href);
  };

  const toggleAccount = () => setIsAccountOpen(!isAccountOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isAccountOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountOpen, isMobileMenuOpen]);

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return 'Guest';
    if (user.displayName) return user.displayName;
    if (user.email) return user.email.split('@')[0];
    return 'User';
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return 'G';
    const name = getUserDisplayName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <nav className="navbar-container">
        <div className="navbar-inner">
          {/* Left Section: Logo + Nav Links (Desktop) */}
          <div className="nav-left">
            <img 
              src={logo} 
              alt="FNY Logo" 
              className="brand-logo"
              onClick={() => history.push('/')}
            />
            
            {/* Desktop Nav Links */}
            <div className="nav-links">
              {mainLinks.map((link) => (
                <button
                  key={link.href}
                  className={`nav-link ${activeLink === link.href ? "active" : ""}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile: Welcome Message */}
            <div className="mobile-welcome-section">
              {isLoggedIn && user?.email ? (
                <span className="mobile-welcome-text">
                  Welcome, <span className="mobile-welcome-email">{user.email}</span>
                </span>
              ) : (
                <span className="mobile-welcome-text">Sign In</span>
              )}
            </div>
          </div>

          {/* Mobile Menu Arrow Button */}
          <div ref={mobileMenuRef} className="position-relative">
            <button
              className={`mobile-menu-arrow-button ${isMobileMenuOpen ? "open" : ""}`}
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-haspopup="true"
            >
              <svg
                className="mobile-menu-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            <div className={`mobile-menu-dropdown ${isMobileMenuOpen ? "open" : ""}`}>
              <div className="mobile-menu-items">
                {/* Navigation Links */}
                {mainLinks.map((link) => (
                  <button
                    key={link.href}
                    className={`mobile-menu-item ${activeLink === link.href ? "active" : ""}`}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    {link.label}
                  </button>
                ))}
                
                <div className="mobile-menu-divider" />

                {/* User Options */}
                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <>
                        <button 
                          className="mobile-menu-item"
                          onClick={() => {
                            history.push('/Create');
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                          CREATE NEW PRODUCT
                        </button>
                        <div className="mobile-menu-divider" />
                      </>
                    )}
                    <button 
                      className="mobile-menu-item"
                      onClick={() => {
                        history.push('/Checkout');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span className="flex-1">CHECKOUT</span>
                      {cartItemCount > 0 && (
                        <span className="cart-badge">
                          {cartItemCount}
                        </span>
                      )}
                    </button>
                    <div className="mobile-menu-divider" />
                    <button 
                      className="mobile-menu-item sign-out"
                      onClick={() => {
                        history.push('/SignOut');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      SIGN OUT
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="mobile-menu-item"
                      onClick={() => {
                        history.push('/Checkout');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span className="flex-1">CHECKOUT</span>
                      {cartItemCount > 0 && (
                        <span className="cart-badge">
                          {cartItemCount}
                        </span>
                      )}
                    </button>
                    <div className="mobile-menu-divider" />
                    <button 
                      className="mobile-menu-item"
                      onClick={() => {
                        history.push('/SignIn');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" y1="12" x2="3" y2="12" />
                      </svg>
                      SIGN IN
                    </button>
                    <button 
                      className="mobile-menu-item"
                      onClick={() => {
                        history.push('/SignUp');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                      </svg>
                      SIGN UP
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Section: Account Dropdown */}
          <div className="nav-right" ref={dropdownRef}>
            {/* Mobile: User Email and Cart Count (visible outside dropdown) */}
            <div className="mobile-user-info">
              {isLoggedIn && user?.email && (
                <span className="text-truncate">
                  {user.email}
                </span>
              )}
              {cartItemCount > 0 && (
                <span className="mobile-cart-badge">
                  {cartItemCount}
                </span>
              )}
            </div>

            {/* Overlay to close dropdown when clicking outside */}
            <div 
              className={`dropdown-overlay ${isAccountOpen ? "active" : ""}`}
              onClick={() => setIsAccountOpen(false)}
            />

            <button
              className={`account-trigger ${isAccountOpen ? "open" : ""}`}
              onClick={toggleAccount}
              aria-expanded={isAccountOpen}
              aria-haspopup="true"
            >
        
              <span className="account-name">
                {isLoggedIn ? getUserDisplayName() : 'MY ACCOUNT'}
              </span>
              {cartItemCount > 0 && (
                <span className="cart-badge-small">
                  {cartItemCount}
                </span>
              )}
              <svg
                className={`dropdown-icon ${isAccountOpen ? "open" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div className={`account-dropdown ${isAccountOpen ? "open" : ""}`}>
              {isLoggedIn ? (
                <>
                  <div className="dropdown-header">
                    <div className="dropdown-user-name">
                      {isAdmin ? 'ADMIN' : getUserDisplayName()}
                    </div>
                    <div className="dropdown-user-email">
                      {user?.email || ''}
                    </div>
                  </div>
                  <div className="dropdown-menu-items">
                    {isAdmin && (
                      <>
                        <button 
                          className="dropdown-item"
                          onClick={() => {
                            history.push('/Create');
                            setIsAccountOpen(false);
                          }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                          CREATE NEW PRODUCT
                        </button>
                        <div className="dropdown-divider" />
                      </>
                    )}
                    <button 
                      className="dropdown-item"
                      onClick={() => {
                        history.push('/Checkout');
                        setIsAccountOpen(false);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span className="flex-1">CHECKOUT</span>
                      {cartItemCount > 0 && (
                        <span className="cart-badge">
                          {cartItemCount}
                        </span>
                      )}
                    </button>
                    <div className="dropdown-divider" />
                    <button 
                      className="dropdown-item sign-out"
                      onClick={() => {
                        history.push('/SignOut');
                        setIsAccountOpen(false);
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      SIGN OUT
                    </button>
                  </div>
                </>
              ) : (
                <div className="dropdown-menu-items">
                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      history.push('/Checkout');
                      setIsAccountOpen(false);
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                      <span className="flex-1">CHECKOUT</span>
                      {cartItemCount > 0 && (
                        <span className="cart-badge">
                          {cartItemCount}
                        </span>
                      )}
                  </button>
                  <div className="dropdown-divider" />
                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      history.push('/SignIn');
                      setIsAccountOpen(false);
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    SIGN IN
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      history.push('/SignUp');
                      setIsAccountOpen(false);
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <line x1="20" y1="8" x2="20" y2="14" />
                      <line x1="23" y1="11" x2="17" y2="11" />
                    </svg>
                    SIGN UP
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
