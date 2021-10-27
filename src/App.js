import logo from './logo.svg';
import './App.css';
import { Form } from 'react-bootstrap/Button';

import { useState } from 'react';
import { DisplayEventCreator } from './components/EventCreation/EventCreation';


const App = () => {
  const [capacityLimit, setCapacityLimit] = useState(false);
  // bug

  return (
    <>
      <div id="main">
        <h1> RespondEZ</h1>
        <DisplayEventCreator capacityLimit={capacityLimit} setCapacityLimit={setCapacityLimit} />
      </div>
    </>
  );
}

export default App;
