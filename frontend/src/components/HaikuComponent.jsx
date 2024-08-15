import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import colors from "../styles/_variables.scss";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datePicker.scss";
import moment from "moment-timezone";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: ${colors.white};
  * {
    transition: all 0.3s ease-in-out;
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  margin: 2em 0em -0.5em 0em;
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

const NavigationButton = styled.button`
  display: inline-block;
  background-color: ${colors.white};
  color: ${colors.textAccent};
  background-color: none;
  border: none;
  padding: 0.25em 0.5em;
  margin: 1em;
  font-size: 2em;
  border-radius: 1em;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: ${colors.textAccent2};
  }

  &.disabled {
    color: ${colors.lightGrey};
    cursor: default;
  }
`;

const HaikuComponent = () => {
  const [haikuData, setHaikuData] = useState({
    date: moment().tz("America/Los_Angeles").format(), // Provide a default value in Pacific Time
    haiku: "loading haiku",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with a valid date object
  const containerRef = useRef(null);

  // Calculate the maxDate to disable future dates
  const minDate = new Date("2023-12-29");
  const maxDate = moment().tz("America/Los_Angeles").endOf("day").toDate();

  useEffect(() => {
    setError(false);

    fetch(
      `https://jiani-fan-portfolio-e60244892674.herokuapp.com/haikus/${moment(
        selectedDate
      )
        .tz("America/Los_Angeles")
        .format("YYYY-MM-DD")}`
    ) // Format the selected date properly
      .then((response) => response.json())
      .then((data) => {
        if (data && data.haiku) {
          data.date = moment(data.date)
            .tz("America/Los_Angeles")
            .format("MM/DD/YYYY");
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

  // handle general navigation

  const isNextDisabled = moment(selectedDate).isSameOrAfter(maxDate, "day");
  const isPrevDisabled = moment(selectedDate).isSameOrBefore(minDate, "day");

  const handleNext = () => {
    const nextDate = moment(selectedDate).add(1, "day").toDate();
    if (nextDate <= maxDate) {
      setSelectedDate(nextDate);
    }
  };

  const handlePrev = () => {
    const prevDate = moment(selectedDate).subtract(1, "day").toDate();
    if (prevDate >= minDate) {
      setSelectedDate(prevDate);
    }
  };

  // handle keyboard events for navigation

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight" && !isNextDisabled) {
      handleNext();
    } else if (event.key === "ArrowLeft" && !isPrevDisabled) {
      handlePrev();
    }
  };

  useEffect(() => {
    const containerElement = containerRef.current;

    if (containerElement) {
      containerElement.focus();
      containerElement.addEventListener("keydown", handleKeyDown);

      return () => {
        containerElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [handleNext, handlePrev, isNextDisabled, isPrevDisabled]);

  return (
    <Container
      ref={containerRef}
      tabIndex="0" // maek the container focusable
      aria-label="Haiku Carousel"
    >
      <Title>
        <p>AI Generated</p>
        <p>Daily Haiku</p>
      </Title>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        shouldCloseOnSelect={true}
        minDate={minDate}
        maxDate={maxDate} // Set the maximum date to disable future dates
      />
      <HaikuCard>
        {loading ? (
          <LoadingScreen>Loading...</LoadingScreen>
        ) : error ? (
          <ErrorScreen>
            <p>
              No haiku found for this date. <br /> Please select a different
              date.
            </p>
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
      <div>
        <NavigationButton
          onClick={handlePrev}
          disabled={isPrevDisabled}
          className={isPrevDisabled ? "disabled" : ""}
        >
          {"<"}
        </NavigationButton>
        <NavigationButton
          onClick={handleNext}
          disabled={isNextDisabled}
          className={isNextDisabled ? "disabled" : ""}
        >
          {">"}
        </NavigationButton>
      </div>
    </Container>
  );
};

export default HaikuComponent;
