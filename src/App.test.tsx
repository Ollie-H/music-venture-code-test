import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

jest.spyOn(window.location, 'replace').mockImplementation(() => null);

test('renders learn react link', () => {
  const { getByTestId } = render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = getByTestId('app');
  expect(linkElement).toBeInTheDocument();
});
