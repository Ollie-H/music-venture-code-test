import React from "react";
import qs from "qs";
import useFetchSpotifySearch from "../../hooks/useFetchSpotifySearch";
import useDebouncedEffect from "../../hooks/useDebouncedEffect";
import { Input, Row, Col, Typography, List, Avatar, Spin } from 'antd';
import { useHistory, useParams } from "react-router-dom";

const Listing: React.SFC = () => {
  const history = useHistory();
  const searchFetch = useFetchSpotifySearch();
  const params: { searchTerm?: string } = qs.parse(history.location.search, { ignoreQueryPrefix: true });
  const [searchTerm, setSearchTerm] = React.useState<string>(params.searchTerm || "");
  
  useDebouncedEffect(() => {
    if (searchTerm) {
      searchFetch.fetch(searchTerm);
      history.push(`${history.location.pathname}?searchTerm=${searchTerm}`);
    }
  }, 500, [searchTerm]);
  
  return <div data-testid="listing-page">
    <Row justify="center" style={{ padding: '30px 0' }} data-testid="listing-page-container"> 
      <Col xs={20} md={16} lg={10}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>Search for a song</Typography.Title>
        <Input
          placeholder="Enter song"
          size="large"
          onChange={e => setSearchTerm(e.target.value)}
          data-testid="listing-page-search"
          value={searchTerm}
        />
      </Col>
    </Row>
    <Row justify="center" style={{ position: 'relative', padding: '30px 0' }}  data-testid="search-results"> 
      <Col xs={20} md={18} lg={14}>
        <List
          data-testid="search-result-list"
          dataSource={searchFetch.data}
          renderItem={item => (
            <List.Item key={item.id} data-testid={`search-list-item-${item.id}`} onClick={() => history.push(`/tracks/${item.id}?searchTerm=${searchTerm}`)}>
              <List.Item.Meta
                avatar={
                  <Avatar alt={`${item.name} cover image`} shape="square" src={item.cover_art} size={60} />
                }
              />
              <Row justify="center" style={{ width: '100%', padding: '12px 12px 12px 0' }}>
                <Col span={12}>
                  <Typography.Paragraph ellipsis data-testid={`search-list-item-${item.id}-artist`}>
                    {item.artist}
                  </Typography.Paragraph>
                </Col>
                <Col span={12}>
                  <Typography.Paragraph ellipsis  data-testid={`search-list-item-${item.id}-name`}>
                    {item.name}
                  </Typography.Paragraph>
                </Col>
              </Row>
            </List.Item>
          )}
        >
          {searchFetch.loading && (
            <div style={{textAlign: "center"}}>
              <Spin  />
            </div>
          )}
        </List>
      </Col>
    </Row>
  </div>;
}

export default Listing;