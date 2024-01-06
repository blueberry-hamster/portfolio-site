import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

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
  margin-bottom: 30px;

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

const ErrorScreen = styled.div`
  font-size: 20px;
  color: red;
  text-align: center;
`;

const HaikuComponent = () => {
  const [haikuData, setHaikuData] = useState({
    date: new Date().toLocaleDateString(), // Provide a default value in desired format
    haiku: 'loading haiku',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with a valid date object

  useEffect(() => {
    setError(false);

    fetch(`http://localhost:3307/haikus/${selectedDate.toISOString().split('T')[0]}`) // Format the selected date properly
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
        console.error('Error fetching haiku:', error);
        setLoading(false);
        setError(true);
      });
  }, [selectedDate]);

  return (
    <Container>
      <Title>AI Daily Haiku</Title>
      {loading ? (
        <LoadingScreen>Loading...</LoadingScreen>
      ) : error ? (
        <ErrorScreen>Oops, couldn't fetch haiku.</ErrorScreen>
      ) : (
        <HaikuCard>
          <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
          <HaikuText>
            {haikuData.haiku.split('<br />').map((line, lineIndex) => (
              <p key={lineIndex}>{line}</p>
            ))}
          </HaikuText>
          <HaikuImage src={haikuData.image} alt={`Haiku ${haikuData.date}`} />
        </HaikuCard>
      )}
    </Container>
  );
};

export default HaikuComponent;