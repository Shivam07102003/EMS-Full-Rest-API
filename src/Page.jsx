import React from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Contents from './Contents.jsx';

function NavBar() {
  return (
    <BootstrapNavbar bg="dark" variant="dark" className="px-3">
      <BootstrapNavbar.Brand href="/#/">Employee Management</BootstrapNavbar.Brand>

      <Nav>
        <NavLink className="nav-link" to="/employees">
          All Employees
        </NavLink>

        <NavLink className="nav-link" to="/report">
          Reports
        </NavLink>
      </Nav>
    </BootstrapNavbar>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}