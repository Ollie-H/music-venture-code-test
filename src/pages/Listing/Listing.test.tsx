import React from "react";
import Listing from "./Listing";
import { render, fireEvent, wait } from "@testing-library/react";
import useFetchSpotifySearch from "../../hooks/useFetchSpotifySearch";
import { Track } from "../../types/spotifyTrack";

const mockHistoryPush = jest.fn();

jest.useFakeTimers();
jest.mock("../../hooks/useFetchSpotifySearch");

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

(useFetchSpotifySearch as jest.Mock).mockImplementation(() => ({
  data: []
}));

const mockTrack: Track = {
  id: "1",
  name: "Track name",
  artist: "Artist name",
  duration_ms: 100,
  cover_art: 'http://test.com'
}

const mockFetch = jest.fn();

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

  it("Should call search on keypress", async () => {
    // Arrange
    const mockSearchTerm = "test";
    (useFetchSpotifySearch as jest.Mock).mockImplementation(() => ({
      fetch: mockFetch,
      data: []
    }));
    const { getByTestId } = render(<Listing />);
    // Act
    fireEvent.change(getByTestId('listing-page-search'), { target: { value: mockSearchTerm } })
    
    jest.runAllTimers();

    await wait();
    // Assert
    expect(mockFetch).toBeCalledWith(mockSearchTerm);
  });


  it("Should display data", async () => {
    // Arrange
    (useFetchSpotifySearch as jest.Mock).mockImplementation(() => ({
      data: [mockTrack]
    }));
    const { getByTestId, getByAltText } = render(<Listing />);
    // Act
    await wait();
    // Assert
    expect(getByTestId('search-list-item-' + mockTrack.id)).toBeInTheDocument();
    expect(getByTestId('search-list-item-' + mockTrack.id + '-artist')).toBeInTheDocument();
    expect(getByTestId('search-list-item-' + mockTrack.id + '-artist')).toHaveTextContent(mockTrack.artist);
    expect(getByTestId('search-list-item-' + mockTrack.id + '-name')).toBeInTheDocument();
    expect(getByTestId('search-list-item-' + mockTrack.id + '-name')).toHaveTextContent(mockTrack.name);
    expect(getByAltText(mockTrack.name + ' cover image')).toBeInTheDocument();
    expect(getByAltText(mockTrack.name + ' cover image')).toHaveAttribute('src', mockTrack.cover_art);
  });



  it("Should display data", async () => {
    // Arrange
    (useFetchSpotifySearch as jest.Mock).mockImplementation(() => ({
      data: [mockTrack]
    }));
    const { getByTestId } = render(<Listing />);
    // Act
    fireEvent.click(getByTestId('search-list-item-' + mockTrack.id));
    await wait();
    // Assert
    expect(mockHistoryPush).toHaveBeenCalledWith("/" + mockTrack.id);
  });
});