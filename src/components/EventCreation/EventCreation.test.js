import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { DisplayEventCreator, createForm } from './EventCreation';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils'; // ES6

afterEach(cleanup);

it('should empty capacity field at its initialization', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <DisplayEventCreator />
    </BrowserRouter>
  );
  expect(getByTestId('capacityTest')).not.toBe('') // ??
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

it('date field cannot be empty to create form', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <DisplayEventCreator />
    </BrowserRouter>
  );
  expect(getByTestId('dateTest')).toHaveAttribute('required');
});

describe('createForm', () => {
  it("won't submit the form if date before today", () => {
    let elements = {}
    elements.eventName = "my event";
    elements.eventDateInput = {"value": new Date('October 1, 2021')};

    const mockAlert = jest.spyOn(window, 'alert');
    mockAlert.mockImplementation(() => {});
    createForm({"target": {"elements": elements}, "preventDefault": () => null});

    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith("Invalid event date: Event must take place today or later.");
  });

  it("won't submit the form if name too long", () => {
    let elements = {}
    elements.eventName = "123456789012345678901234567890123456789012345678901";
    elements.eventDateInput = {"value": new Date('December 1, 2021')};

    const mockAlert = jest.spyOn(window, 'alert');
    mockAlert.mockImplementation(() => {});
    createForm({"target": {"elements": elements}, "preventDefault": () => null});

    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith("Invalid event name: Must be under 50 characters.");
  });

  it("won't submit the form if capacity is zero or negative", () => {
    let elements = {};
    elements.isThereCapacity = { 'checked' : true };
    elements.capacityLimit = { "value" : "-500" };

    const mockAlert = jest.spyOn(window, 'alert');
    mockAlert.mockImplementation(() => {});
    createForm({ "target" : { "elements" : elements }, "preventDefault" : () => null});

    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith("Invalid event capacity: Capacity should be positive.");
  });

  it("won't submit the form if capacity is empty", () => {
    let elements = {};
    elements.isThereCapacity = { 'checked' : true };
    elements.capacityLimit = { "value" : "" };

    const mockAlert = jest.spyOn(window, 'alert');
    mockAlert.mockImplementation(() => {});
    createForm({ "target" : { "elements" : elements }, "preventDefault" : () => null});

    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith("Missing capacity!");
  });

  it("won't create form if the name field is empty", () => {
    let elements = {};
    elements.eventName = "";
    elements.eventDateInput = {"value": new Date('February 4, 2022')};

    const mockAlert = jest.spyOn(window, 'alert');
    mockAlert.mockImplementation(() => {});
    createForm({"target": {"elements": elements}, "preventDefault": () => null});

    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith("Missing event name!");
  });
});