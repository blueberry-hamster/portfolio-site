import React, { useEffect, useRef } from "react";
import "../styles/credits.scss"; // Import the associated SCSS file

const Credits = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    initApp();
  }, []);

  const initApp = () => {
    const words = [
      "thanks! 🫶",
      "visit again 🪃",
      "grateful 💖",
      "Jiani Fan 🐼",
      "hire me 💫",
      "portfolio 🍞🧈",
      "full stack 🥞",
      "software ⌨️",
      "engineer 🤓",
      "web 🕸️",
      "HTML 🪜",
      "Javascript 🏃",
      "CSS 🎨",
      "React 🩵",
      "Node.js",
      "Python 🐍",
      "Ruby 🔻",
      "Ruby on Rails 🛤️",
      "SQL 🗂️",
      "database 🛢️",
      "🌈✨creativity✨",
      "design 🗿",
      "^_^",
      ":3",
      "(◕‿◕ )",
      "🌙",
      "🌸",
      "✨",
      "🍓",
      "⭐",
      "🎈",
      "🍉",
      "⭐",
      "🎈",
      "🌷",
      "🌙",
      "🌸",
      "✨",
      "🍓",
      "🍉",
    ];
    const container = containerRef.current;

    const addElement = () => {
      
      const element = document.createElement("span");
      container.appendChild(element);
      animateElement(element, words);
    };

    const animateElement = (element, words) => {
      const word = words[Math.floor(Math.random() * words.length)];
      const duration = Math.floor(Math.random() * 15) + 1;
      const offset = Math.random() * 100;
      const size = 10 + (15 - duration);

      element.style.cssText = `right:${offset}vw; font-size:${size}px; animation-duration:${duration}s;`;
      element.innerHTML = word;

      setTimeout(() => removeElement(element), duration * 1000);
    };

    const removeElement = (element) => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };

    window.setInterval(addElement, 500); // Schedule additions
  };

  return (
  <div className="credits-container">
    <div ref={containerRef} className="animation-container" />
  </div>
  );
};

export default Credits;
