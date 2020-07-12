import { useState, useEffect } from "react";
import axios from "axios";
import useSpotifyAuthContext from "./useSpotifyAuthContext";

interface UseFetchState<T>  {
  loading: boolean;
  loaded: boolean;
  error?: string;
  data?: T;
}

export interface UseFetchReturn<T> extends UseFetchState<T> {
  fetch: (url: string) => void;
}

export default <T>(): UseFetchReturn<T> => {

  const spotifyAuthContext = useSpotifyAuthContext();
  const [ url, setUrl ] = useState<string>();
  const [fetchState, setFetchState] = useState<UseFetchState<T>>({
    loading: false,
    loaded: false,
    data: undefined
  });

  const fetchData = async () => {
    if (!url) {
      return;
    }
    setFetchState(state => ({ ...state, data: undefined, loading: true, error: undefined }));
    try {
      const { data } = await axios.get<T>(url, {
        headers: {
          Authorization: "Bearer " + spotifyAuthContext.token
        }
      });
      setFetchState(state => ({ ...state, data, loading: false, loaded: true }));
    } catch (e) {
      setFetchState({ loading: false, error: e.message, loaded: true, data: undefined });
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { ...fetchState, fetch: (url) => setUrl(url) };
};
