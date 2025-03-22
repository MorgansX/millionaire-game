import React from 'react';
import './styles.css';

export const Hamburger = () => (
  <>
    <input type="checkbox" id="menu-toggle" className="MenuToggle" />
    <label htmlFor="menu-toggle" className="HamburgerButton" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </>
);
