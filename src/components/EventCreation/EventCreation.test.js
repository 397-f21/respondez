import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { DisplayEventCreator } from './EventCreation';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils'; // ES6

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

describe('event name input', () => {
  it("won't submit the form if name too long", async () => {
    const { getByTestId, getByText } = render(
      <BrowserRouter>
      <DisplayEventCreator />
    </BrowserRouter>
    );
    const nameField = getByTestId("nameTest");
    const submitButton = getByTestId("submitTest");
    nameField.innerHTML = "123456789012345678901234567890123456789012345678901";
    await act(async () => {
      fireEvent.click(submitButton);
    });
    const alert = getByText("Invalid event name: Must be under 50 characters.");
    expect(alert).toHaveTextContent("Invalid event name: Must be under 50 characters.");
  })
})