import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.spyOn(window.location, 'replace').mockImplementation(() => null);

test('renders learn react link', () => {
  const { getByTestId } = render(<App />);
  const linkElement = getByTestId('app');
  expect(linkElement).toBeInTheDocument();
});
