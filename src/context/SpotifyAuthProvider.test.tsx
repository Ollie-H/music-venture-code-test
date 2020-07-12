import React from 'react';
import { render } from "@testing-library/react";
import SpotifyAuthContext from "./SpotifyAuthContext";
import getSpotifyAuthToken from "../utils/getSpotifyAuthToken";
import SpotifyAuthProvider from "./SpotifyAuthProvider";

jest.mock("../utils/getSpotifyAuthToken");

const InnerComponent = () => {
  const context = React.useContext(SpotifyAuthContext); 
  return <div data-testid="token">{context.token}</div>
}

const mockRedirect = jest.fn(() => null);

describe("SpotifyAuthProvider", () => {

    beforeEach(() => {
      jest.clearAllMocks();
    })

    it("Should render with empty token when one is not found", () => {
      (getSpotifyAuthToken as jest.Mock).mockReturnValueOnce(undefined);
      const { getByTestId } = render(<SpotifyAuthProvider handleRedirect={mockRedirect}><InnerComponent /></SpotifyAuthProvider>);
      // Act
      // Assert
      expect(getByTestId('token')).toHaveTextContent('');
    });

    it("Should call redirect with valid spotify URL when a token is not set", () => {
      // Arrange
      (getSpotifyAuthToken as jest.Mock).mockReturnValueOnce(undefined);
      render(<SpotifyAuthProvider handleRedirect={mockRedirect} />);
      // Act
      // Assert
      expect(mockRedirect).toBeCalledWith('https://accounts.spotify.com/authorize?client_id=5addcf67a07b45d8a9dbcfc1daf5f25a&scope=user-read-private%2520user-read-email&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=token&show_dialog=true');
    });

    it("Should render with valid", () => {
      (getSpotifyAuthToken as jest.Mock).mockReturnValueOnce('XXXXX');
      const { getByTestId } = render(<SpotifyAuthProvider handleRedirect={mockRedirect}><InnerComponent /></SpotifyAuthProvider>);
      // Act
      // Assert
      expect(getByTestId('token')).toHaveTextContent('XXXXX');
    });
});