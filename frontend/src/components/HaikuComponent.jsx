import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import colors from "../styles/_variables.scss";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datePicker.scss";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: ${colors.white};
`;

const Title = styled.h1`
  margin: 2em 0em 0.5em 0em;
  text-align: center;
  p:first-child {
    margin-bottom: -1em;
    font-weight: 400;
    font-size: 0.8em;
  }
`;

const HaikuCard = styled.div`
  background-color: ${colors.white};
  padding: 1em;
  margin-top: 1.5em;
  max-width: 35em;
  text-align: center;
  filter: drop-shadow(0.1em 0.2em 0.2em ${colors.shadowLight});
  border-radius: 0.6em;
`;

const HaikuText = styled.div`
  font-size: 1em;
  margin: 1.5em;
  text-align: center;

  & p {
    margin-bottom: -0.6em;
  }
`;

const HaikuImage = styled.img`
  width: 100%; // Make the width fill the container
  height: auto; // Set height to auto to maintain aspect ratio
  aspect-ratio: 1 / 1; // Ensure the image is always square
  object-fit: cover; // Cover the container fully without stretching
  border-radius: 0.6em;
  max-width: 100%;
  max-height: 100%;
`;

const LoadingScreen = styled.div`
  font-size: 1.5em;
  color: ${colors.textSecondary};
  text-align: center;
`;

const ErrorScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  min-width: 20vw;
  min-height: 20vw;
  max-width: 40em;
  max-height: 40em;
  color: ${colors.textAccent};
  text-align: center;
`;

const HaikuComponent = () => {
  const [haikuData, setHaikuData] = useState({
    date: new useState(new Date().toLocaleString("en-US", { timeZone: "UTC" })), // Provide a default value in desired format
    haiku: "loading haiku",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with a valid date object
  // Calculate the maxDate to disable future dates
  const maxDate = new Date();
  maxDate.setHours(23, 59, 59, 999);

  useEffect(() => {
    setError(false);

    fetch(
      `https://jiani-fan-portfolio-e60244892674.herokuapp.com/haikus/${
        selectedDate.toISOString().split("T")[0]
      }`
    ) // Format the selected date properly
      .then((response) => response.json())
      .then((data) => {
        if (data && data.haiku) {
          data.date = new Date(data.date).toLocaleDateString();
          setHaikuData(data);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching haiku:", error);
        setLoading(false);
        setError(true);
      });
  }, [selectedDate]);

  return (
    <Container>
      <Title>
        <p>AI Generated</p>
        <p>Daily Haiku</p>
      </Title>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        shouldCloseOnSelect={true}
        minDate={new Date("2023-12-29")} 
        maxDate={maxDate} // Set the maximum date to disable future dates
      />
      <HaikuCard>
        {loading ? (
          <LoadingScreen>Loading...</LoadingScreen>
        ) : error ? (
          <ErrorScreen>
            <p>No haiku found for this date. <br/> Please select a different date.</p>
          </ErrorScreen>
        ) : (
          <>
            <HaikuImage src={haikuData.image} alt={`Haiku ${haikuData.date}`} />
            <HaikuText>
              {haikuData.haiku.split("<br />").map((line, lineIndex) => (
                <p key={lineIndex}>{line}</p>
              ))}
            </HaikuText>
          </>
        )}
      </HaikuCard>
    </Container>
  );
};

export default HaikuComponent;
