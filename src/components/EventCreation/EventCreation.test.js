import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { DisplayEventCreator } from './EventCreation';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

it('should empty capacity field at its initialization', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <DisplayEventCreator />
    </BrowserRouter>
  );
  expect(getByTestId('capacityTest')).not.toBe('')
});

it('name field cannot be empty to create form', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <DisplayEventCreator />
    </BrowserRouter>
  );
  expect(getByTestId('nameTest')).toHaveAttribute('required');
});

it('event description cannot be empty to create form', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <DisplayEventCreator />
    </BrowserRouter>
  );
  expect(getByTestId('descriptionTest')).toHaveAttribute('required');
});
