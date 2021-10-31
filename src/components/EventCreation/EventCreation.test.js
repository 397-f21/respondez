import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { DisplayEventCreator} from './EventCreation';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

it('should equal to 0', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <DisplayEventCreator />
    </BrowserRouter>
  );
  expect(getByTestId('capacityTest')).not.toBe('')
});

it('event description cannot be empty to create form', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <DisplayEventCreator />
    </BrowserRouter>
      
  );
  expect(getByTestId('descriptionTest')).toHaveAttribute('required'); 
});
