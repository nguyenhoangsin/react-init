import React from "react";
import "./Header.scss"; // Import CSS riêng cho header

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">My Website</div>
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
