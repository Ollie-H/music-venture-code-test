import { useContext } from "react";
import SpotifyAuthContext from "../context/SpotifyAuthContext";

export default () => {
  return useContext(SpotifyAuthContext);
}