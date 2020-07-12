import React from 'react';
import SpotifyAuthProvider from "./context/SpotifyAuthProvider";
import ListingPage from "./pages/Listing";

function App() {
  return (
    <SpotifyAuthProvider handleRedirect={(url) => window.location.replace(url)}>
      <div data-testid="app">
        <ListingPage />
      </div>
    </SpotifyAuthProvider>
  );
}

export default App;
