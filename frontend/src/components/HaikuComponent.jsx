import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import colors from "../styles/_variables.scss";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datePicker.scss";
import moment from "moment-timezone";

// Styled components for the layout
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
    outline: none; // Remove focus outline for the container
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
  width: 100%; // Fill the container's width
  height: auto; // Maintain aspect ratio
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
    date: moment().tz("America/Los_Angeles").format(), // Default date in Pacific Time
    haiku: "loading haiku",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with the current date
  const containerRef = useRef(null); // Reference for the container to manage focus

  // Set the range of valid dates for the DatePicker
  const minDate = new Date("2023-12-29");
  const maxDate = moment().tz("America/Los_Angeles").endOf("day").toDate();

  // Fetch the haiku data whenever the selectedDate changes
  useEffect(() => {
    setError(false); // Reset error state on date change

    fetch(
      `https://jiani-fan-portfolio-e60244892674.herokuapp.com/haikus/${moment(
        selectedDate
      )
        .tz("America/Los_Angeles")
        .format("YYYY-MM-DD")}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.haiku) {
          // Format the date and update haiku data
          data.date = moment(data.date)
            .tz("America/Los_Angeles")
            .format("MM/DD/YYYY");
          setHaikuData(data);
        } else {
          setError(true); // Set error if no haiku is found
        }
        setLoading(false); // Set loading to false after data fetch
      })
      .catch((error) => {
        console.error("Error fetching haiku:", error);
        setLoading(false);
        setError(true); // Set error if fetch fails
      });
  }, [selectedDate]);

  // Determine if the navigation buttons should be disabled
  const isNextDisabled = moment(selectedDate).isSameOrAfter(maxDate, "day");
  const isPrevDisabled = moment(selectedDate).isSameOrBefore(minDate, "day");

  // Handle navigation to the next date
  const handleNext = () => {
    const nextDate = moment(selectedDate).add(1, "day").toDate();
    if (nextDate <= maxDate) {
      setSelectedDate(nextDate);
    }
  };

  // Handle navigation to the previous date
  const handlePrev = () => {
    const prevDate = moment(selectedDate).subtract(1, "day").toDate();
    if (prevDate >= minDate) {
      setSelectedDate(prevDate);
    }
  };

  // Handle keyboard navigation for date changes
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight" && !isNextDisabled) {
      handleNext();
    } else if (event.key === "ArrowLeft" && !isPrevDisabled) {
      handlePrev();
    }
  };

  // Add keyboard event listener on component focus and remove it on blur/unmount
  useEffect(() => {
    const containerElement = containerRef.current;

    if (containerElement) {
      containerElement.focus(); // Focus the container
      containerElement.addEventListener("keydown", handleKeyDown); // Add keyboard event listener

      return () => {
        containerElement.removeEventListener("keydown", handleKeyDown); // Clean up event listener
      };
    }
  }, [handleNext, handlePrev, isNextDisabled, isPrevDisabled]);

  return (
    <Container
      ref={containerRef}
      tabIndex="0" // Make the container focusable
      aria-label="Haiku Carousel" // Screen reader description
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
        maxDate={maxDate} // Disable future dates
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
          aria-label="Previous Date" // Accessibility label
        >
          {"<"}
        </NavigationButton>
        <NavigationButton
          onClick={handleNext}
          disabled={isNextDisabled}
          className={isNextDisabled ? "disabled" : ""}
          aria-label="Next Date" // Accessibility label
        >
          {">"}
        </NavigationButton>
      </div>
    </Container>
  );
};

export default HaikuComponent;
