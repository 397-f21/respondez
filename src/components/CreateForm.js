import React from 'react';
import { useState } from 'react';
import { DisplayEventCreator } from './EventCreation/EventCreation';
import { FormDisplay } from './EventCreation/FormDisplay';

const CreateForm = () => {
  const [capacityLimit, setCapacityLimit] = useState(false);
  const [formMaker, setFormMaker] = useState(true);
  const [formContent, setFormContent] = useState(null);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return (
    <div>
      {formMaker  // params.id === null 
        ? <DisplayEventCreator capacityLimit={capacityLimit} setCapacityLimit={setCapacityLimit} setFormMaker={setFormMaker} setFormContent={setFormContent} />
        : <FormDisplay formContent={formContent} />}
    </div>
  );
}

export default CreateForm;