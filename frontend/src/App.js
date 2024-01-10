import './styles/App.scss';
import React from 'react';
import HaikuComponent from './components/Haiku';
import Landing from './components/Landing';

function App() {
  return (
    <div>
      <Landing />
      <HaikuComponent />
    </div>
  );
}

export default App;

