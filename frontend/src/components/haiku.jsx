import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import colors from "../styles/_variables.scss";
import "react-datepicker/dist/react-datepicker.css";
import "./datePicker.scss";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  box-sizing: border-box;
  background-color: ${colors.white};
`;

const Title = styled.h2`
  margin: 2em 0em 0.5em 0em;
`;

const HaikuCard = styled.div`
  // border: 1px solid #e6e6e6;
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

  & p {
    margin-bottom: -0.6em;
  }
`;

const HaikuImage = styled.img`
  max-width: 100%;
  height: 55vh;
  border-radius: 0.6em;
`;

const LoadingScreen = styled.div`
  font-size: 1.5em;
  color: ${colors.textSecondary};
  text-align: center;
`;

const ErrorScreen = styled.div`
  font-size: 1.5em;
  color: ${colors.textAccent};
  text-align: center;
`;

const HaikuComponent = () => {
  const [haikuData, setHaikuData] = useState({
    date: new Date().toLocaleDateString(), // Provide a default value in desired format
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
      `http://localhost:3307/haikus/${selectedDate.toISOString().split("T")[0]}`
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
      <Title>Daily Haiku</Title>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        shouldCloseOnSelect={true}
        minDate={new Date("2023-12-29")} // Set the minimum date to "12/27/2023"
        maxDate={maxDate} // Set the maximum date to disable future dates
      />
      <HaikuCard>
        {loading ? (
          <LoadingScreen>Loading...</LoadingScreen>
        ) : error ? (
          <ErrorScreen>
            <p>No haiku found for this date.</p>
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
