import React, { useState } from 'react';
import logo from '../assets/imgs/logoFNY.png';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const Header = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(prev => !prev);

  const user = useSelector(state => state.currentUser);
  const isAdmin = useSelector(state => state.admin);

  const isLoggedIn = !!user;

  const mainLinks = [
    { href: '/All', label: 'ALL PRODUCTS' },
    { href: '/Body', label: 'BODY' },
    { href: '/Face', label: 'FACE' },
    { href: '/Lips', label: 'LIPS' },
  ];

  const renderMainNav = () => (
    <Nav navbar className="mr-auto">
      {mainLinks.map((link, idx) => (
        <React.Fragment key={link.href}>
          {idx === 0 && (
            <NavItem className="mr-2" style={{ paddingRight: '30px' }}>
              <NavLink style={{ color: 'grey' }} href={link.href}>
                {link.label}
              </NavLink>
            </NavItem>
          )}
          {idx > 0 && (
            <>
              <NavbarText>
                <span style={{ color: 'grey', paddingRight: '30px' }}>|</span>
              </NavbarText>
              <NavItem>
                <NavLink
                  style={{ color: 'grey', paddingRight: '30px' }}
                  href={link.href}
                >
                  {link.label}
                </NavLink>
              </NavItem>
            </>
          )}
        </React.Fragment>
      ))}
    </Nav>
  );

  const renderAccountMenu = () => {
    // Not logged in
    if (!isLoggedIn) {
      return (
        <>
          <NavItem>
            <NavLink style={{ paddingRight: '100px' }} href="/SignIn">
              SIGN IN
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={{ paddingRight: '100px' }} href="/SignUp">
              SIGN UP
            </NavLink>
          </NavItem>
        </>
      );
    }

    // Admin
    if (isAdmin) {
      return (
        <>
          <NavbarText className="mr-3">
            HELLO, ADMIN
          </NavbarText>
          <NavItem>
            <NavLink style={{ paddingRight: '100px' }} href="/Create">
              CREATE NEW PRODUCT
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={{ paddingRight: '100px' }} href="/SignOut">
              SIGN OUT
            </NavLink>
          </NavItem>
        </>
      );
    }

    // Regular logged-in user
    return (
      <>
        <NavbarText className="mr-3">
          {`HELLO, ${user.email ? user.email.toUpperCase() : ''}`}
        </NavbarText>
        <NavItem>
          <NavLink style={{ paddingRight: '100px' }} href="/SignOut">
            SIGN OUT
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{ paddingRight: '100px' }} href="/Checkout">
            CHECKOUT
          </NavLink>
        </NavItem>
      </>
    );
  };

  return (
    <Navbar color="light" light>
      <NavbarBrand style={{ paddingRight: '100px' }} href="/">
        <img src={logo} alt="logo" width="80px" />
      </NavbarBrand>

      {renderMainNav()}

      <NavbarText>
        <span style={{ color: 'grey', paddingRight: '30px' }}>|</span>
      </NavbarText>

      <NavbarToggler
        style={{ borderStyle: 'none' }}
        onClick={toggleNavbar}
        className="mr-2"
      >
        MY ACCOUNT
      </NavbarToggler>

      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          {renderAccountMenu()}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;


