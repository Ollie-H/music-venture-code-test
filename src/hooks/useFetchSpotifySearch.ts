import { SpotifySearchResponse, Track } from "../types/spotifyTrack";
import mapSearchToTracks from "../mappers/mapSearchToTracks";
import useFetch, { UseFetchReturn } from "./useFetch";

export default (): UseFetchReturn<Track[]> => {
  const spotifySearch = useFetch<SpotifySearchResponse>();
  
  return {
    ...spotifySearch,
    data: mapSearchToTracks(spotifySearch.data),
    fetch: (searchTerm: string) => spotifySearch.fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track&limit=10`)
  };
}