import React from "react";
import styled from "styled-components";

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
  position: sticky;
  z-index: 2;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: fit-content;
  display: flex;
  img {
    height: 25vh;
    width: 25vh;
  }
  filter: drop-shadow(0.1em 0.2em 0.2em rgba(138, 9, 44, 0.6));
`;

const Logo = styled.div`
  background-image: url(redRecord.jpg);
  background-attachment: fixed;
  -webkit-mask-attachment: fixed;
  -webkit-mask-image: url(jf.png);
  -webkit-mask-size: 25vh;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  height: 25vh;
  width: 25vh;
  filter: drop-shadow(5px 5px 10px #000000);
`;

const SubHeader = styled.div`
  font-size: 3em;
  padding: 0.5em;
  margin: auto;
  letter-spacing: 0.13em;
`;

const Glass = styled.div`
  z-index: 3;
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
  -webkit-backdrop-filter: blur(50px); /* For Safari compatibility */
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

const Landing = () => {
  return (
    <Body>
      <Glass />
      <Header>
        {/* <Logo /> */}
        <img src="jf.png" alt="JF logo" />
        <SubHeader>portfolio</SubHeader>
      </Header>
    </Body>
  );
};

export default Landing;
