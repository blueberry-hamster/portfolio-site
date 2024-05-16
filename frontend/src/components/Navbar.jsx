import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  -webkit-backdrop-filter: blur(5px); // For Safari and iOS
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
const HamburgerMenu = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const HamburgerIcon = styled.div`
  width: 27px;
  height: 2px;
  background-color: ${colors.textSecondary};
  margin: 3px 0;
  border-radius: 10%;
`;

const DropdownMenu = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-start;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  box-shadow: 0 2px 5px ${colors.shadowLight};
  border-radius: 0.375em;
  position: absolute;
  top: 3em; // Adjusts position below the hamburger icon
  right: 1.7em;
  z-index: 1000;
`;

const DropdownItem = styled.button`
  display: flex;
  width: 100%;
  padding: 1em 1.5em;
  border: none;
  background: none;
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

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <LogoText className="logo-text">Portfolio</LogoText>
      </LogoContainer>

      {windowWidth >= 900 ? (
        <NavMenu>
          <NavLink onClick={() => scrollToSection("about-me")}>About</NavLink>
          <NavLink onClick={() => scrollToSection("multifaceted")}>Multifaceted</NavLink>
          <NavLink onClick={() => scrollToSection("timeline")}>
            Timeline
          </NavLink>
          <NavLink onClick={() => scrollToSection("haiku")}>Haikus</NavLink>
          <NavLink onClick={() => scrollToSection("contact")}>Contact</NavLink>
        </NavMenu>
      ) : (
        <HamburgerMenu onClick={() => setMenuVisible(!menuVisible)}>
          <HamburgerIcon />
          <HamburgerIcon />
          <HamburgerIcon />

          <DropdownMenu show={menuVisible}>
            <DropdownItem onClick={() => scrollToSection("landing")}>Home</DropdownItem>
            <DropdownItem onClick={() => scrollToSection("about-me")}>
              About Me
            </DropdownItem>
            <DropdownItem onClick={() => scrollToSection("multifaceted")}>
              Multifaceted
            </DropdownItem>
            <DropdownItem onClick={() => scrollToSection("timeline")}>
              Timeline
            </DropdownItem>
            <DropdownItem onClick={() => scrollToSection("haiku")}>
              Haikus
            </DropdownItem>
            <DropdownItem onClick={() => scrollToSection("contact")}>
              Contact
            </DropdownItem>
          </DropdownMenu>
        </HamburgerMenu>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
