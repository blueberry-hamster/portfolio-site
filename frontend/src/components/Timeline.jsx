// Timeline.jsx
import React from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

const TimelineContainer = styled.div`
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;

  * {
    transition: all 0.3s ease-in-out;
  }

  &:after {
    content: "";
    position: absolute;
    width: 0.25em;
    background: linear-gradient(
      to bottom,
      transparent,
      ${colors.textAccent} 10%,
      ${colors.textAccent} 90%,
      transparent
    );
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: 0.125em;
  }
`;

const TimelineHeader = styled.h1`
  padding-left: 5em;
  padding-top: 1.5em;
  width: 100vw
`

const TimelineContent = styled.div`
  padding: 1.25em 1.875em;
  background-color: white;
  position: relative;
  border-radius: 0.375em;
  filter: drop-shadow(0.1em 0.2em 0.2em ${colors.shadowLight});

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    margin-top: -0.3125em;
    border-width: 0.625em;
    border-style: solid;
    border-color: transparent white transparent transparent;
  }
`;

const TimelineItem = styled.div`
  padding: 0.625em 2.5em;
  position: relative;
  width: 50%;
  box-sizing: border-box;
  z-index: 2;

  &:hover {
    // cursor: pointer;
    filter: drop-shadow(0.2em 0.7em 0.6em ${colors.shadowLight});
  }

  &:nth-child(odd) {
    left: 0%;

    &:after {
      right: -1.25em;
      margin-left: -2em / 2; // Half the circle width to align the circle with the middle line
    }

    ${TimelineContent}::after {
      left: 100%;
      margin-left: 0;
      border-color: transparent transparent transparent white;
    }
  }

  &:nth-child(even) {
    left: 50%;

    &:after {
      left: -0.75em;
      margin-right: 5%;
    }

    ${TimelineContent}::after {
      left: auto;
      right: 100%;
      margin-left: 0;
      margin-right: 0;
      border-color: transparent white transparent transparent;
    }
  }

  &:after {
    // the circles
    content: "";
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    top: 46%;
    right: -0.75em;
    background-color: white;
    background-image: url(redRecord.jpg);
    background-size: cover;
    background-attachment: fixed;
    border: 0.25em solid ${colors.textAccent};
    filter: drop-shadow(0.1em 0.2em 0.2em ${colors.shadowLight});
    border-radius: 50%;
    z-index: 1;
  }
`;



const Timeline = () => {
  return (
    <TimelineContainer>
      <TimelineHeader>
        Timeline
      </TimelineHeader>
      <TimelineItem>
        <TimelineContent>
          <h2>2010 - 2014</h2>
          <h3>UC Berkeley: BS Environmental Science
          </h3>
          <p>Your text here</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineContent>
          <h2>2014 - 2015</h2>
          <h3>Hungr.ly: UI/UX Designer</h3>
          <p>Your text here</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineContent>
          <h2>2016</h2>
          <h3>PPC: Product Designer</h3>
          <p>Your text here</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineContent>
          <h2>2016 - 2018</h2>
          <h3>Truffle Pig: Content Creator</h3>
          <p>Your text here</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineContent>
          <h2>2019</h2>
          <h3>App Academy: Fullstack Bootcamp</h3>
          <p>Your text here</p>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineContent>
          <h2>2019 - 2023</h2>
          <h3>Riviera Partners: Software Engineer</h3>
          <p>Your text here</p>
        </TimelineContent>
      </TimelineItem>
    </TimelineContainer>
  );
};

export default Timeline;