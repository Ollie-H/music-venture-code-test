import React from "react";
import useFetchSpotifySearch from "../../hooks/useFetchSpotifySearch";
import useDebouncedEffect from "../../hooks/useDebouncedEffect";
import { Input } from 'antd';

const Listing: React.SFC = () => {
  const searchFetch = useFetchSpotifySearch();
  const [searchTerm, setSearchTerm] = React.useState<string>();
  
  useDebouncedEffect(() => {
    if (searchTerm) searchFetch.fetch(searchTerm);
  }, 500, [searchTerm]);
  
  return <div data-testid="listing-page">
    <Input
      placeholder="Search for a track..."
      size="large"
      onChange={e => setSearchTerm(e.target.value)}
      data-testid="listing-page-search"
    />
  </div>;
}

export default Listing;