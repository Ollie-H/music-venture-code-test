import React from "react";
import spotifyAuth from "../utils/spotifyAuth";
import SpotifyAuthContext from "./SpotifyAuthContext";
import { CLIENT_ID, REDIRECT_URL, SCOPES } from "../config";

interface SpotifyAuthProviderProps {
  handleRedirect: (url: string) => void;
}


const SpotifyAuthProvider: React.SFC<SpotifyAuthProviderProps> = ({ children, handleRedirect }) => {

  const token = spotifyAuth.getToken();

  // If no token is set, call redirect prop
  if (!token) {
    handleRedirect(
      'https://accounts.spotify.com/authorize' +
      '?client_id=' + CLIENT_ID +
      '&scope=' + encodeURIComponent(SCOPES.join('%20')) +
      '&redirect_uri=' + encodeURIComponent(REDIRECT_URL) +
      '&response_type=token&show_dialog=true');
  }
  
  return (
    <SpotifyAuthContext.Provider
      value={{ token }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export default SpotifyAuthProvider;