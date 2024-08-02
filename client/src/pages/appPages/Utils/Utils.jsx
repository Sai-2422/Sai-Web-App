import React from "react";
import { NavLink } from "react-router-dom";

const Utils = () => {
  const navLinkStyle = {
    margin: '0 10px',
    padding: '10px 15px',
    textDecoration: 'none',
    color: 'black',
    borderRadius: '5px',
    display: 'inline-block'
  };

  const activeStyle = {
    color: 'white',
    backgroundColor: '#007bff'
  };

  return (
    <nav>
      <NavLink
        to="/calculator"
        style={({ isActive }) => ({
          ...navLinkStyle,
          ...(isActive ? activeStyle : {})
        })}
      >
        Calculator
      </NavLink>
      <NavLink
        to="/price-calculator"
        style={({ isActive }) => ({
          ...navLinkStyle,
          ...(isActive ? activeStyle : {})
        })}
      >
        Price Calculator
      </NavLink>
    </nav>
  );
};

export default Utils;
