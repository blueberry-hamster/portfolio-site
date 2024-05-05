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
  position: relative;
  background-image: url(redMacro.jpg);
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 1;
`;

const Header = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 5em;
  height: fit-content;
  display: flex;
  animation: ${fadeInBounce} 1s ease forwards;
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


const HeaderText = styled.h1`
  color: ${colors.white};
  font-size: 2.6em;
  text-align: center;
  margin-top: -0.5em;
  p:nth-child(2) {
    font-size: 0.7em;
    letter-spacing: 0.25em;
    margin-top: -1.4em;
    font-weight: 400;
  }
`;

const Glass = styled.div`
  position: absolute;
  width: 100vw;
  height: 220vh;
  top: 0;
  background-color: rgba(255, 255, 255, 1);
  backdrop-filter: blur(5px);
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.1) 35%,
    rgba(0, 0, 0, 0.4) 40%,
    rgba(0, 0, 0, 0.7) 45%,
    rgba(0, 0, 0, 1) 48%
  );
  overflow: hidden;
  box-sizing: border-box;
  z-index: 2;
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
  const glassRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const { current } = glassRef;
      if (current) {
        const scrollMultiplier = -1.07;
        const offset = window.scrollY * scrollMultiplier;
        current.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useHoverEffect(headerRef);

  return (
    <Body>
      <Glass ref={glassRef} />
      <Header ref={headerRef}>
        <Logo />
        <HeaderText>
          <p>Jiani Fan</p>
          <p>Portfolio</p>
        </HeaderText>
      </Header>
    </Body>
  );
};

export default Landing;
