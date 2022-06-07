import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import { internal_resolveProps } from "@mui/utils";
import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import App from './App';
import {getPrevDate} from './components/LogDay';
import { getQuestionsAPIMethod, getNumberResponsesAPIMethod } from './api/client';
import { LogDay } from './components/LogDay'

afterEach(() => {
  cleanup();
})

it('render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// test failed
test("Getting previous date", () => {
  expect(getPrevDate()).toBeDefined();
})

test("Getting questions", () => {
  expect(getQuestionsAPIMethod()).toBeDefined();
})

test("Getting number responses", () => {
  expect(getNumberResponsesAPIMethod()).toBeDefined();
})

// test failed
test("should render LogDay Component", () => {
  render(<LogDay />);
  var logdayElement = screen.getByTestId("logday");
  expect(logdayElement).toBeInTheDocument();
})