import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { DisplayEventCreator } from './EventCreation';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

afterEach(cleanup);

it('should equal to 0', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <DisplayEventCreator />
    </BrowserRouter>
  );
  expect(getByTestId('capacityTest')).not.toBe('')
});