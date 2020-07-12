import qs from "qs";
import { LOCAL_STORAGE_PATH } from "../config";
import { SpotifyAccessToken } from "../types/spotifyAuth";

export default (): string | undefined  => {
  const localStorageToken: SpotifyAccessToken = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_PATH) || '{}');
  const urlToken: Partial<SpotifyAccessToken> = qs.parse(window.location.hash.substr(1));
  
  if (urlToken.access_token) {
    window.localStorage.setItem(LOCAL_STORAGE_PATH, JSON.stringify(urlToken));
  }

  return localStorageToken.access_token || urlToken.access_token;
}