import React, { useState } from "react";
import styled from 'styled-components';

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ translateX }) => `translateX(-${translateX}%);`};
`;

const CarouselSlide = styled.div`
  min-width: 100%;
  flex-shrink: 0;
  transition: opacity 0.5s ease-in-out;
`;

const CarouselControls = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  pointer-events: none;
`;

const ControlButton = styled.button`
  pointer-events: all;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const CarouselIndicator = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ isActive }) =>
    isActive ? "white" : "rgba(255, 255, 255, 0.5)"};
  border-radius: 50%;
  cursor: pointer;
`;

const Carousel = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
    })
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
    })
  }

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  }

  return (
    <CarouselContainer>
      <CarouselTrack translateX={currentIndex * 100}>
        {images.map((image, index) => (
          <CarouselSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%" }}
            />
          </CarouselSlide>
        ))}
      </CarouselTrack>
      <CarouselControls>
        <ControlButton onClick={handlePrev}>‹</ControlButton>
        <ControlButton onClick={handleNext}>›</ControlButton>
      </CarouselControls>
      <CarouselIndicator>
        {images.map((_, index) => (
          <Indicator
            key={index}
            isActive={index === currentIndex}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </CarouselIndicator>
    </CarouselContainer>
  );
}

export default Carousel;