import React from 'react';
import SpotifyAuthProvider from "./context/SpotifyAuthProvider";
import spotifyAuth from "./utils/spotifyAuth";
import ListingPage from "./pages/Listing";
import TrackPage from "./pages/Track";
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <Switch>
        <Route exact path="/" children={() => <Redirect to="/tracks" />} />
        <Route exact path="/callback" children={() => {
          spotifyAuth.setTokenFromUrl();
          return <Redirect to="/" />
        }} />
        <Route path="/tracks">
          <SpotifyAuthProvider handleRedirect={(url) => window.location.replace(url)}>
            <div data-testid="app">
              <Switch>
                <Route exact path="/tracks" children={() => (
                  <ListingPage />
                )} />
                <Route exact path="/tracks/:trackId" children={() => (
                  <TrackPage />
                )} />
              </Switch>
            </div>
          </SpotifyAuthProvider>
        </Route>
    </Switch>
  );
}

export default App;
