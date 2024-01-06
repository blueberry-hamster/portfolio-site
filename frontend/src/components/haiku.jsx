import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DatePicker } from 'react-datepicker'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 50px 0px;
`;

const HaikuCard = styled.div`
  border: 1px solid #e6e6e6;
  padding: 20px;
  max-width: 700px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const HaikuText = styled.div`
  color: #131313;
  font-size: 16px;
  margin-bottom: 30px

  & p {
    margin-bottom: -10px;
  }
`;

const HaikuImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

const HaikuDate = styled.h3`
  font-size: 20px;
  margin-top: 10px;
`;

const LoadingScreen = styled.div`
  font-size: 20px;
  color: #333;
  text-align: center;
`;
const test = 1;

const HaikuComponent = () => {
  const [haikuData, setHaikuData] = useState({
    date: new Date().toISOString().split('T')[0], // Provide a default value
    haiku: '', // Provide a default value
    image: '', // Provide a default value
  });
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {

    fetch(`http://localhost:3307/haikus/${selectedDate}`)
      .then((response) => response.json())
      .then((data) => {
        setHaikuData(data.formattedHaiku);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching haiku:', error);
        setLoading(false); // Set loading to false on error
      });
  }, [selectedDate]);

  return (
    <Container>
      <Title>AI Daily Haiku</Title>
      {loading ? (
        // Display a loading screen while data is being fetched
        <LoadingScreen>Loading...</LoadingScreen>
      ) : (
        <HaikuCard>
          {haikuData && haikuData.date && (
            <HaikuDate>{haikuData.date}</HaikuDate>
          )}
          <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
          <HaikuText>
            {haikuData && haikuData.haiku && haikuData.haiku.split('<br />').map((line, lineIndex) => (
              <p key={lineIndex}>{line}</p>
            ))}
          </HaikuText>
          <HaikuImage src={haikuData && haikuData.image} alt={`Haiku ${haikuData && haikuData.date}`} />
        </HaikuCard>
      )}
    </Container>
  );
};

export default HaikuComponent;
