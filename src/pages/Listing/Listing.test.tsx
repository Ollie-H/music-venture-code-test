import React from "react";
import Listing from "./Listing";
import { render } from "@testing-library/react";


describe("Listing", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render", () => {
    // Arrange
    const { getByTestId } = render(<Listing />);
    // Act
    // Assert
    expect(getByTestId('listing-page')).toBeInTheDocument();
  });

  it("Should render search component", () => {
    // Arrange
    const { getByTestId } = render(<Listing />);
    // Act
    // Assert
    expect(getByTestId('listing-page-search')).toBeInTheDocument();
  });
});