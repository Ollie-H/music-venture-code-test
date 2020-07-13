import qs from "qs";
import { LOCAL_STORAGE_PATH } from "../config";
import { SpotifyAccessToken } from "../types/spotifyAuth";

class SpotifyAuth {
  getToken(): string | undefined {
    const localStorageToken: SpotifyAccessToken = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_PATH) || '{}');

    if (localStorageToken && this.isTokenExpired(localStorageToken)) {
      return undefined;
    }
    return localStorageToken.access_token;
  }
  
  isTokenExpired(token: SpotifyAccessToken) {
    return new Date().getTime() > parseInt(token.expires_in);
  }

  setTokenFromUrl() {
    const urlToken: Partial<SpotifyAccessToken> = qs.parse(window.location.hash.substr(1));

    if (urlToken.expires_in) {
      urlToken.expires_in = new Date().getTime() + (parseInt(urlToken.expires_in) * 1000);
      window.localStorage.setItem(LOCAL_STORAGE_PATH, JSON.stringify(urlToken));
    }
  }
}

export default new SpotifyAuth();