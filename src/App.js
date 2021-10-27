import logo from './logo.svg';
import './App.css';
import { Form } from 'react-bootstrap/Button';

import { useState } from 'react';
import { DisplayEventCreator } from './components/EventCreation/EventCreation';
import { FormDisplay } from './components/EventCreation/FormDisplay';



const App = () => {
  const [capacityLimit, setCapacityLimit] = useState(false);
  const [formMaker, setFormMaker] = useState(true);
  // bug

  return (
    <>
      <div id="main">
        <h1> RespondEZ</h1>
        {formMaker 
        ? <DisplayEventCreator capacityLimit={capacityLimit} setCapacityLimit={setCapacityLimit} setFormMaker={setFormMaker}/>
        : <FormDisplay/>}
      </div>
    </>
  );
}

export default App;
