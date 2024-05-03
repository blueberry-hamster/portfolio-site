// Timeline.jsx
import React from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

const mobileBreakpoint = "750px"; // Define a variable for the mobile breakpoint

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
  width: 100vw;
  p:first-child {
    margin-bottom: -1em;
    font-weight: 400;
    font-size: 0.8em;
  }

  @media screen and (max-width: ${mobileBreakpoint}) {
    padding-left: 1em;
  }
`;

const TimelineContent = styled.div`
  position: relative;
  padding: 1.25em 1.875em;
  max-width: 35em;
  background-color: white;
  border-radius: 0.375em;
  filter: drop-shadow(0.1em 0.2em 0.2em ${colors.shadowLight});

  &:after {
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
  position: relative;
  display: flex;
  width: 50%;
  padding: 0.625em 2.5em;
  box-sizing: border-box;
  z-index: 2;

  @media screen and (max-width: ${mobileBreakpoint}) {
    width: 100%;
  }

  &:hover {
    filter: drop-shadow(0.2em 0.7em 0.6em ${colors.shadowLight});
  }

  &:nth-child(odd) {
    left: 0%;
    justify-content: flex-end;

    &:after {
      right: -1.25em;
      margin-left: -2em / 2; // Half the circle width to align the circle with the middle line
    }

    ${TimelineContent}::after {
      left: 100%;
      margin-left: 0;
      border-color: transparent transparent transparent white;
      @media screen and (max-width: ${mobileBreakpoint}) {
        display: none;
      }
    }
  }

  &:nth-child(even) {
    left: 50%;

    @media screen and (max-width: ${mobileBreakpoint}) {
      left: 0%;
    }

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

      @media screen and (max-width: ${mobileBreakpoint}) {
        display: none;
      }
    }
  }

  @media screen and (min-width: ${mobileBreakpoint}) {
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
  }
`;

const timelineEntries = [
  {
    period: "2010 - 2014",
    title: "UC Berkeley: BS Environmental Science",
    description: "Your text here",
  },
  {
    period: "2014 - 2015",
    title: "Hungr.ly: UI/UX Designer",
    description: "Your text here",
  },
  {
    period: "2016",
    title: "PPC: Product Designer",
    description: "Your text here",
  },
  {
    period: "2016 - 2018",
    title: "Truffle Pig: Content Creator",
    description: "Your text here",
  },
  {
    period: "2019",
    title: "App Academy: Fullstack Bootcamp",
    description: "Your text here",
  },
  {
    period: "2019 - 2023",
    title: "Riviera Partners: Software Engineer",
    description: "Your text here",
  },
  {
    period: "2024",
    title: "New Possibilities",
    description: "Your text here",
  },
];

const Timeline = () => {
  return (
    <TimelineContainer>
      <TimelineHeader>
        <p>Work</p>
        <p>Timeline</p>
      </TimelineHeader>
      {timelineEntries.map((entry, index) => (
        <TimelineItem key={index}>
          <TimelineContent>
            <h2>{entry.period}</h2>
            <h3>{entry.title}</h3>
            <p>{entry.description}</p>
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};

export default Timeline;

