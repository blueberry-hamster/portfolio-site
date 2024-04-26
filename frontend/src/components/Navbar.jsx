import React from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  padding: 0.5em 2em;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px ${colors.shadowLight};

  * {
    transition: all 0.3s ease-in-out;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover .logo-text {
    transform: translateX(0);
    opacity: 1;
    color: ${colors.textAccent2};
  }
`;
  
  const Logo = styled.img`
  height: 2em;
  `;
  
  const LogoText = styled.span`
    font-weight: bold;
    color: ${colors.textAccent};
    margin-left: 10px;
    opacity: 0;
    transform: translateX(100%);
    transition: transform 0.3s ease-out, opacity 0.3s ease-out,
      color 1s ease-in-out;

    // Media query to hide text on narrow screens
    @media (max-width: 600px) {
      display: none;
    }
  `;


const NavMenu = styled.div`
  display: flex;
  gap: 1em;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: ${colors.textSecondary};
  font-size: 1em;
  font-weight: bold;

  &:hover {
    color: ${colors.textAccent};
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

// Navbar Component
const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <NavbarContainer>
      <LogoContainer onClick={() => scrollToSection("landing")}>
        <Logo src="jf.png" alt="jf logo" />
        <LogoText className="logo-text">Jiani Fan</LogoText>
      </LogoContainer>
      <NavMenu>
        <NavLink onClick={() => scrollToSection("cube")}>About</NavLink>
        <NavLink onClick={() => scrollToSection("timeline")}>Timelime</NavLink>
        <NavLink onClick={() => scrollToSection("haiku")}>Daily Haiku</NavLink>
      </NavMenu>
    </NavbarContainer>
  );
};

export default Navbar;
