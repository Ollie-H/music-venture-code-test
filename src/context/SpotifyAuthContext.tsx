import React from "react";

export interface SpotifyAuthContextState {
  token?: string;
}

const SpotifyAuthContext = React.createContext<SpotifyAuthContextState>({
  token: undefined,
});

export default SpotifyAuthContext;
