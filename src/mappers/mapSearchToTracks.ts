import { SpotifySearchResponse, Track } from "../types/spotifyTrack";

export default (spotifyResponse?: SpotifySearchResponse): Track[] | undefined => {
  if (!spotifyResponse) {
    return undefined;
  }

  return spotifyResponse.tracks.items.map((track) => ({
    id: track.id,
    name: track.name,
    artist: track.artists.reduce((acc, artist) => acc ? acc + `, ${artist.name}` : artist.name, ""),
    duration_ms: track.duration_ms,
    cover_art: track.album.images[0].url
  }))
}