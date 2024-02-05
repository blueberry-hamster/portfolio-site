import React, { useState } from "react";
import "../styles/diamond.scss"; 

const DiamondComponent = () => {
  const [intro, setIntro] = useState(true);

  const toggleIntro = () => {
    setIntro(!intro);
  };

  return (
    <div className={`diamond ${intro ? "intro" : ""}`}>
      <div className="diamond__base">
        <div className="diamond-bottom">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`diamond-slice diamond-slice--${i}`}>
              <div className="diamond-slice-a">
                <div className="pavilion">
                  <div className="pavilion__face"></div>
                </div>
                <div className="diamond-slice-b">
                <div className="facet"></div>
                <div className="top"></div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiamondComponent;
