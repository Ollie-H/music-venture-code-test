import { Track, SpotifyTrack } from "../types/spotifyTrack";

export default (track?: SpotifyTrack): Track | undefined => {
  if (!track) {
    return undefined;
  }

  return {
    id: track.id,
    name: track.name,
    artist: track.artists.reduce((acc, artist) => acc ? acc + `, ${artist.name}` : artist.name, ""),
    duration_ms: track.duration_ms,
    cover_art: track.album.images[0].url
  };
}