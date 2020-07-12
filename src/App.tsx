import React from 'react';
import SpotifyAuthProvider from "./context/SpotifyAuthProvider";

function App() {
  return (
    <SpotifyAuthProvider handleRedirect={(url) => window.location.replace(url)}>
      <div data-testid="app" />
    </SpotifyAuthProvider>
  );
}

export default App;
