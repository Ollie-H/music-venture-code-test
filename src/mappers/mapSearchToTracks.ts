import { SpotifySearchResponse, Track } from "../types/spotifyTrack";
import mapToTrack from "./mapToTrack";

export default (spotifyResponse?: SpotifySearchResponse): Track[] | undefined => {
  if (!spotifyResponse) {
    return undefined;
  }

  return spotifyResponse.tracks.items.map(mapToTrack) as Track[];
}