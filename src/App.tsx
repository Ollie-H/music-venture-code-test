import React from 'react';
import SpotifyAuthProvider from "./context/SpotifyAuthProvider";
import ListingPage from "./pages/Listing";
import TrackPage from "./pages/Track";
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <SpotifyAuthProvider handleRedirect={(url) => window.location.replace(url)}>
      <div data-testid="app">
        <Switch>
          <Route exact path="/" component={() => (
            <ListingPage />
          )} />
          <Route exact path="/:trackId" component={() => (
            <TrackPage />
          )} />
        </Switch>
      </div>
    </SpotifyAuthProvider>
  );
}

export default App;
