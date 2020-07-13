import { Track, SpotifyTrack } from "../types/spotifyTrack";
import mapToTrack from "../mappers/mapToTrack";
import useFetch, { UseFetchReturn } from "./useFetch";

export default (): UseFetchReturn<Track> => {
  const spotifySearch = useFetch<SpotifyTrack>();
  
  return {
    ...spotifySearch,
    data: mapToTrack(spotifySearch.data),
    fetch: (id: string) => spotifySearch.fetch(`https://api.spotify.com/v1/tracks/${id}`)
  };
}