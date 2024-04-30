import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { gsap } from "gsap";
import colors from "../styles/_variables.scss";

const fadeInBounce = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-4em);
    filter: drop-shadow(0.1em 0.6em 1em ${colors.shadowLight});
  }
  10% {
    opacity: 0.1;
    transform: translateY(2em);
  }
  20% {
    opacity: 0.3;
    transform: translateY(0em);
  }
  35% {
    opacity: 0.5;
    transform: translateY(2em);
    filter: drop-shadow(0.1em 0em 0.05em ${colors.shadowDark});
  }
  99% {
    opacity: 1;
    transform: translateY(0em);
    filter: drop-shadow(0.1em 0.2em 0.2em ${colors.shadowMedium});
  }
`;

const Body = styled.div`
  background-image: url(redMacro.jpg);
  background-size: cover;
  background-attachment: fixed;
  box-sizing: border-box;
  height: 100vh;
  padding: 10em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: fit-content;
  display: flex;
  animation: ${fadeInBounce} 1.5s ease forwards;
  filter: drop-shadow(0.1em 0.2em 0.2em ${colors.shadowMedium});
`;

const Logo = styled.div`
  background-image: url(redRecord.jpg);
  background-attachment: fixed;
  -webkit-mask-image: url(jf.png);
  mask-image: url(jf.png);
  -webkit-mask-size: 25vh;
  mask-size: 25vh;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  height: 25vh;
  width: 25vh;
`;


const SubHeader = styled.div`
  color: ${colors.white};
  font-size: 3em;
  width: max-content;
  padding: 0.5em;
  margin: auto;
  /* letter-spacing: 0.13em; */
`;

const Glass = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1) 60%,
    rgba(255, 255, 255, 0.4) 70%,
    rgba(255, 255, 255, 0.7) 85%,
    rgba(255, 255, 255, 1) 100%
  );
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 60%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.7) 85%,
    rgba(0, 0, 0, 1) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 60%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.7) 85%,
    rgba(0, 0, 0, 1) 100%
  );
  mix-blend-mode: hard-light;
`;

const useHoverEffect = (ref) => {
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const calculatePosition = () => {
      if (ref.current) {
        gsap.set(ref.current, {
          x: 0,
          y: 0,
          scale: 1,
        });
      }
    };

    const onMouseMove = (e) => {
      if (!ref.current) return;
      const box = ref.current.getBoundingClientRect();
      const x = e.clientX - box.left - box.width * 0.5;
      const y = e.clientY - box.top - box.height * 0.5;
      const distance = Math.sqrt(x * x + y * y);
      const hoverArea = hover ? 0.7 : 0.5;

      if (distance < box.width * hoverArea) {
        if (!hover) {
          setHover(true);
        }
        gsap.to(ref.current, {
          x: x * 0.4,
          y: y * 0.4,
          scale: 1.05,
          filter: "drop-shadow(0.1em 1em 0.2em rgba(62, 8, 36, 0.5))",
          ease: "power2.out",
          duration: 0.4,
        });
        // ref.current.style.zIndex = 10;
      } else if (hover) {
        gsap.to(ref.current, {
          x: 0,
          y: 0,
          scale: 1,
          filter: "drop-shadow(0.1em 0.2em 0.2em rgba(62, 8, 36, 0.5))",
          ease: "elastic.out(1.2, 0.4)",
          duration: 0.7,
        });
        // ref.current.style.zIndex = 3;
        setHover(false);
      }
    };

    calculatePosition();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", calculatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", calculatePosition);
    };
  }, [hover, ref]);
};

const Landing = () => {
  const headerRef = useRef(null);
  useHoverEffect(headerRef);

  return (
    <Body>
      <Glass />
      <Header ref={headerRef}>
        <Logo />
        <SubHeader>Jiani Fan</SubHeader>
        {/* <SubHeader>Portfolio</SubHeader> */}
      </Header>
    </Body>
  );
};

export default Landing;
