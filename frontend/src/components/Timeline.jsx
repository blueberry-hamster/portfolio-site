// Timeline.jsx
import React from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

const mobileBreakpoint = "750px"; // Define a variable for the mobile breakpoint

const TimelineContainer = styled.div`
  position: relative;
  min-height: 100vh;
  margin: 0 auto;
  padding-bottom: 7em;
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
  width: 100%;
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
  line-height: 1.4em;
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
    description:
      "I earned a Bachelor of Science in Environmental Science from UC Berkeley, developing a solid foundation in analytical thinking and problem-solving. My major focused on understanding complex systems and leveraging data to make informed decisions. <br/><br/>Additionally, I explored computer science fundamentals in my final year, sparking my interest in software. Engaging in various group projects and interdisciplinary studies, I honed my collaborative skills, preparing me for diverse professional settings. Go Bears! 🐻",
  },
  {
    period: "2014 - 2015",
    title: "Hungr.ly: UI/UX Designer",
    description:
      "At Hungr.ly, I embraced a versatile role that spanned all aspects of design. From capturing enticing photos at local eateries to crafting high-fidelity mockups, I touched every part of the creative process. <br/><br/>My collaboration with engineers ensured our designs were made into functional features, conducting user research kept our app aligned with user needs. Additionally, I shaped Hungr.ly's branding, adapting swiftly and focusing keenly on details to pick up new skills rapidly.",
  },
  {
    period: "2016",
    title: "PPC: Product Designer",
    description:
      "At PPC, I spearheaded the development of a new line of 3D flower card kits, designed for customers to grow real flowers. I managed everything from conceptual design to packaging prototyping, ensuring our creations were both aesthetically pleasing and manufacturable. This role demanded quick adaptation and robust problem-solving as we continually refined our products.",
  },
  {
    period: "2016 - 2018",
    title: "Truffle Pig: Content Creator",
    description:
      "Working at Truffle Pig, a social media advertising agency, I crafted ads primarily for Snapchat. My clientele ranged from television shows to luxury brands, each requiring a unique advertising approach that reflected their brand identity. Utilizing my graphic design and illustration expertise, I produced engaging ads and fun Snapchat filters, managing varying campaign cadences and consistently delivering under tight deadlines.",
  },
  {
    period: "2019",
    title: "App Academy: Fullstack Bootcamp",
    description:
      "I graduated from App Academy’s intensive Fullstack Bootcamp, learning JavaScript, Ruby on Rails, and React. This rigorous program sharpened my abilities across both front-end and back-end development, equipping me with the skills to undertake comprehensive web development projects.",
  },
  {
    period: "2019 - 2023",
    title: "Riviera Partners: Software Engineer",
    description:
      "At Riviera Partners, an executive recruiting firm in the tech/medical sector, I significantly contributed to refining our proprietary software that leverages machine learning to enhance recruitment. My focus was primarily on front-end development using React, Styled Components, and Tailwind, supported by a Ruby on Rails backend.<br/><br/>Throughout my tenure, I played an important role in two major product overhauls, necessitating quick learning and application of new technologies. As I became a leader within the front-end team, I facilitated effective communication between developers, product managers, designers, and data scientists.<br/><br/>Beyond routine tasks, I initiated enhancements to improve our platform comprehensively. I also engaged directly with SQL, broadening my technical repertoire. I also helped cultivate a collaborative team atmosphere by organizing and hosting online events (we were all remote).",
  },
  {
    period: "2024",
    title: "New Possibilities",
    description:
      "I am eager to explore new opportunities where I can apply my development experience and passion for crafting beautiful, user-centered solutions. I look forward to discussing how I can contribute to your team’s success!",
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
            <p className="serif" dangerouslySetInnerHTML={{ __html: entry.description }} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};

export default Timeline;

