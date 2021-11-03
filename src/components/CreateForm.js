import React from 'react';
import { useState } from 'react';
import { DisplayEventCreator } from './EventCreation/EventCreation';

const CreateForm = () => {
  const [capacityLimit, setCapacityLimit] = useState(false);
  const [formMaker, setFormMaker] = useState(true);
  const [formContent, setFormContent] = useState(null);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return (
    <div>
      {formMaker  // params.id === null 
        ? <DisplayEventCreator capacityLimit={capacityLimit}
          setCapacityLimit={setCapacityLimit} setFormMaker={setFormMaker}
          setFormContent={setFormContent} />
        : <h1>test</h1>}
    </div>
  );
}

export default CreateForm;