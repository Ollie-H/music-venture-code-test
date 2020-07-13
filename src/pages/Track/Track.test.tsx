

import React from "react";
import TrackPage from "./Track";
import { render, fireEvent, wait } from "@testing-library/react";
import useFetchSpotifyTrack from "../../hooks/useFetchSpotifyTrack";
import { Track } from "../../types/spotifyTrack";

const mockFetch = jest.fn();
const mockHistoryPush = jest.fn();
const mockTrack: Track = {
  id: "1",
  name: "Track name",
  artist: "Artist name",
  duration_ms: 90000,
  cover_art: 'http://test.com'
};

jest.mock("../../hooks/useFetchSpotifyTrack");
jest.mock("react-router-dom", () => ({
  useParams: () => ({
    trackId: "trackId"
  }),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));
(useFetchSpotifyTrack as jest.Mock).mockImplementation(() => ({
  data: mockTrack,
  fetch: mockFetch
}));

describe("Track", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render", () => {
    // Arrange
    const { getByTestId } = render(<TrackPage />);
    // Act
    // Assert
    expect(getByTestId('track-page')).toBeInTheDocument();
  });
  
  it("Should call fetch with correct ID", () => {
    // Arrange
    render(<TrackPage />);
    // Act
    // Assert
    expect(mockFetch).toBeCalledWith('trackId');
  });


  it("Should display data", async () => {
    // Arrange
    const { getByTestId, getByAltText } = render(<TrackPage />);
    // Act
    await wait();
    // Assert
    expect(getByTestId('track-artist')).toHaveTextContent(mockTrack.artist);
    expect(getByTestId('track-name')).toHaveTextContent(mockTrack.name);
    expect(getByTestId('track-duration')).toHaveTextContent('1:30');
    expect(getByAltText(mockTrack.name + ' cover')).toHaveAttribute('src', mockTrack.cover_art);
  });

  it("Should navigate back to results when back is clicked", async () => {
    // Arrange
    const { getByTestId } = render(<TrackPage />);
    // Act
    await wait();
    fireEvent.click(getByTestId('track-back-button'));
    // Assert
    expect(mockHistoryPush).toHaveBeenCalledWith('/tracks');
  });

});