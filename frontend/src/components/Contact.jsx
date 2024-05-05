import React, { useState } from "react";
import styled from "styled-components";
import colors from "../styles/_variables.scss";

const pageBreak = "900";

// Styled components for the form elements
const ContactContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  width: fit-content;
  margin: 0 auto; // Center the container
  padding: 2em 1em 1em 1em;
  box-sizing: border-box; // Include padding in width calculations

  * {
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: ${pageBreak + "px"}) {
    padding: 2em 1em;
  }
`;

const Title = styled.h1`
  margin: 2em 0em 1.5em 0em;
  padding-left: 1em;
  /* text-align: center; */
  p:nth-child(2) {
    margin-top: -1em;
    margin-bottom: -1em;
    font-weight: 400;
    font-size: 0.7em;
  }
`;

const ErrorMessage = styled.div`
  color: ${colors.textAccent}; // Error message color
  font-size: 0.9em; // Smaller font size
  font-weight: 600;
  margin-bottom: 1em; // Spacing between the error and textarea
`;

const TextContainer = styled.div`
  width: 60vw;
  max-width: 45em;
  margin-top: 1em;
  padding: 3em;
  background-color: ${colors.white};
  filter: drop-shadow(0.1em 0.2em 0.2em ${colors.shadowLight});
  border-radius: 0.6em;
  box-sizing: border-box;

  @media (max-width: ${pageBreak + "px"}) {
    padding: 2em 1em;
    max-width: 95vw;
    margin: auto;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 20em;
  padding: 1em;
  border: 1px solid ${colors.white};
  border-radius: 0.375em;
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
  font-size: 1em;
  font-weight: 300;
  caret-color: ${colors.textAccent};
  resize: vertical;
  box-shadow: 0.1em 0.2em 0.2em ${colors.shadowLight} inset;

  &:focus {
    outline: none; // Remove the focus outline
  }
  @media (max-width: ${pageBreak + "px"}) {
    box-shadow: none;
  }
`;

const Button = styled.button`
  background-color: ${colors.textAccent};
  color: ${colors.white};
  border: none;
  margin-top: 1em;
  padding: 0.65em 1.5em;
  border-radius: 0.375em;
  cursor: pointer;
  font-size: 1.1em;
  transition: background-color 0.3s;
  filter: drop-shadow(0.1em 0.1em 0.05em ${colors.shadowLight});

  &:hover {
    background-color: ${colors.textAccent2};
    box-shadow: 0.1em 0.2em 0.15em ${colors.shadowMedium} inset;
    color: ${colors.lightGrey};
    filter: none;
  }
`;

const ContactMe = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSendEmail = () => {
    // Check if the message is blank or only whitespace
    if (!message.trim()) {
      setError(true);
      return;
    }

    // Email address to send to
    const email = "contactme@jianifan.com"; // Change to your email
    // Subject for the email
    const subject = "Hello, Jiani!";
    // Body for the email
    const body = encodeURIComponent(message);

    // Create a "mailto:" link with the subject and body
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    // Redirect to the "mailto:" link
    window.location.href = mailtoLink;
  };

  return (
    <ContactContainer>
      <Title>
        <p>Contact Me 👋</p>
        <p>contactme@jianifan.com</p>
      </Title>
      <TextContainer>
        {error && (
          <ErrorMessage>Oops, don't forget to write a message :)</ErrorMessage>
        )}
        <TextArea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setError(false); // Reset the error state
          }}
          placeholder=":) Write your message here..."
        />
        <Button onClick={handleSendEmail}>Send</Button>
      </TextContainer>
    </ContactContainer>
  );
};

export default ContactMe;
