import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav>
      <NavLink exact activeClassname="active" to="/pages/Login.js">
        Home
      </NavLink>
      <NavLink exact activeClassname="active" to="/pages/Member.js">
        Member
      </NavLink>
    </nav>
  );
}

export default Header;
