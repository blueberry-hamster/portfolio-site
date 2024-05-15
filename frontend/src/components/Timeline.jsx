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

  strong {
    display: block;
  }

  li {
    margin-bottom: 1em;
  }

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
      "<ul><li><strong>Earned a Bachelor of Science in Environmental Science:</strong> Graduated from UC Berkeley with a strong foundation in analytical thinking and problem-solving, focusing on understanding complex systems and leveraging data for informed decision-making.</li><li><strong>Explored Computer Science Fundamentals:</strong> Sparked an interest in software during my final year by studying computer science fundamentals.</li><li><strong>Honed Collaborative Skills:</strong> Engaged in various group projects and interdisciplinary studies, which prepared me for diverse professional settings.</li></ul>",
  },
  {
    period: "2014 - 2015",
    title: "Hungr.ly: UI/UX Designer",
    description:
      "<ul><li><strong>Versatile Design Role:</strong> Embraced a role that spanned all aspects of design, from capturing enticing photos at local eateries to crafting high-fidelity mockups.</li><li><strong>Collaboration with Engineers:</strong> Worked closely with engineers to ensure designs were translated into functional features.</li><li><strong>Conducted User Research:</strong> Conducted user research to keep the app aligned with user needs.</li><li><strong>Shaped Branding:</strong> Played a key role in shaping Hungr.ly's branding.</li></ul>",
  },
  {
    period: "2016",
    title: "PPC: Designer",
    description:
      "<ul><li><strong>Contributed to Product Development:</strong> Assisted in the development of a new line of 3D flower card kits, designed for customers to grow real flowers.</li><li><strong>Involved in Conceptual Design to Packaging Prototyping:</strong> Participated in the process from conceptual design to packaging prototyping, ensuring creations were aesthetically pleasing and manufacturable.</li><li><strong>Adapted Quickly and Solved Problems:</strong> Adapted quickly and solved problems efficiently as we refined our product lines.</li></ul>",
  },
  {
    period: "2016 - 2018",
    title: "Truffle Pig: Content Creator/ Designer",
    description:
      "<ul><li><strong>Ad Creation for Snapchat:</strong> Crafted ads primarily for Snapchat, with a clientele ranging from television shows to luxury brands. Each campaign required a unique advertising approach that reflected the client's brand identity.</li><li><strong>Graphic Design and Illustration Expertise:</strong> Utilized my skills in graphic design and illustration to produce engaging ads and fun Snapchat filters. Managed varying campaign cadences and consistently delivered under tight deadlines.</li><li><strong>Revamped Branding and Internal Assets:</strong> Took the initiative to create new branding assets such as custom icons, images, presentation layouts, and company swag. These resources were immediately adopted by all company employees and greatly increased presentation-creation speed.</li><li><strong>Quick Adaptation to New Technologies:</strong> Learned new technologies on the fly to meet project demands. For instance, when our website was outdated, I independently learned CEROS, a technology that wraps around CSS and CSS transitions, to create an updated splash page for potential clients.</li></ul>",
  },
  {
    period: "2019",
    title: "App Academy: Fullstack Bootcamp",
    description:
      "<strong> Comprehensive Fullstack Development Training:</strong>Completed App Academy's 1000-hour+ intensive Fullstack Bootcamp, learning JavaScript, Ruby on Rails, and React. This rigorous program enhanced my abilities in both front-end and back-end development, preparing me for complex web development projects.",
  },
  {
    period: "2019 - 2023",
    title: "Riviera Partners: Software Engineer",
    description:
      "<ul><li><strong>Enhanced Proprietary Software:</strong> Significantly contributed to refining Riviera Partners' software, which leverages machine learning to improve recruitment in the tech/medical sector.</li><li><strong>Front-End Development Focus:</strong> Specialized in front-end development using React, Styled Components, and Tailwind, supported by a Ruby on Rails backend.</li><li><strong>Key Contributor in Product Overhauls:</strong> Played an important role in two major product overhauls, learning and applying new technologies quickly while proposing improvements to the platform.</li><li><strong>Took Initiative with Leadership:</strong> Took initiative to lead and support my team in the absence of a formal team lead, ensuring effective communication between developers, product managers, designers, and data scientists. My team actually requested to have me become the new lead during the quarterly review, but they were already in the process of hiring a new lead by then.</li><li><strong>Expanded Technical Skills and Fostered Collaboration:</strong> Worked directly with SQL to broaden my technical skills and organized online events to promote a collaborative atmosphere in a remote work environment.</li></ul>",
  },
  {
    period: "2024",
    title: "New Possibilities",
    description:
      "I am excited to embrace new opportunities where I can bring my development experience and passion for creating elegant, user-focused solutions. I look forward to connecting and exploring how I can contribute to your team's success!",
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
            <p className="serif-lite" dangerouslySetInnerHTML={{ __html: entry.description }} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
};

export default Timeline;

