import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom';

global.window = { location: { pathname: null } };
afterEach(cleanup)

it('render button on home', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const button = getByTestId("createFormButton");
  expect(button).toBeTruthy();
});

it('create form button links to the form creation page', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const button = getByTestId("createFormButton");
  fireEvent.click(button);
  expect(global.window.location.pathname).toEqual('/create');
});