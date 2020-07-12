export interface SpotifyArtist {
  name: string;
}

export interface SpotifyCoverArt {
  url: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  artists: SpotifyArtist[];
  album: {
    images: SpotifyCoverArt[];
  }
}


export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[]
  }
}

export interface Track {
  id: string;
  name: string;
  artist: string;
  cover_art: string;
  duration_ms: number;
}