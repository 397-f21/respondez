import logo from './logo.svg';
import './App.css';
import { Form } from 'react-bootstrap/Button';

import { useState } from 'react';
import { DisplayEventCreator } from './components/EventCreation/EventCreation';
import { FormDisplay } from './components/EventCreation/FormDisplay';



const App = () => {
  const [capacityLimit, setCapacityLimit] = useState(false);
  const [formMaker, setFormMaker] = useState(true);
  const [formContent, setFormContent] = useState(null);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  return (
    <>
      <div id="main">
        <h1> RespondEZ</h1>
        {formMaker  // params.id === null 
        ? <DisplayEventCreator capacityLimit={capacityLimit} setCapacityLimit={setCapacityLimit} setFormMaker={setFormMaker} setFormContent={setFormContent}/>
        : <FormDisplay formContent={formContent}/>}
      </div>
    </>
  );
}

export default App;
