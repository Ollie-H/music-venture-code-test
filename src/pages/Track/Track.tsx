import React from "react";
import useFetchSpotifyTrack from "../../hooks/useFetchSpotifyTrack";
import { Row, Col, Typography, Spin, Breadcrumb } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, useHistory } from "react-router-dom";

const Track: React.SFC = () => {
  const history = useHistory();
  const params = useParams<{ trackId: string }>();
  const searchFetch = useFetchSpotifyTrack();

  React.useEffect(() => {
    searchFetch.fetch(params?.trackId)
  }, [params, searchFetch]);


  if (searchFetch.loading) {
    return (<div style={{textAlign: "center", marginTop: '200px'}}>
      <Spin  />
    </div>)
  };

  if (!searchFetch.data) {
    return null;
  }

  const duration = new Date(1000 * Math.round(searchFetch.data.duration_ms / 1000));

  return <div data-testid="track-page">
    <Row justify="center" style={{ padding: '30px 0' }} data-testid="track-page-container">
      <Col xs={20} md={16} lg={12}>
        <Row style={{ paddingBottom: '24px' }}>
          <Col xs={20} md={16} lg={12}>
            <Breadcrumb>
            <Breadcrumb.Item href="" onClick={(e) => {
              e.preventDefault();
              history.push('/tracks'+window.location.search);
            }} data-testid="track-back-button">
              <ArrowLeftOutlined />
              <span>Back</span>
            </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <img style={{ width: '100%', border: "1px solid #f0f0f0" }} src={searchFetch.data?.cover_art} alt={`${searchFetch.data?.name} cover`}  />
          </Col>
          <Col span={12}>
            <Typography.Paragraph style={{ paddingLeft: '24px' }}> 
              <Typography.Title level={4}>
                <span data-testid="track-name">{searchFetch.data.name}<br /></span>
              </Typography.Title> 
              <span data-testid="track-duration">{duration.getUTCMinutes()}:{duration.getUTCSeconds()}<br /></span>
              <span data-testid="track-artist">{searchFetch.data.artist}</span>
            </Typography.Paragraph>
          </Col>
        </Row>
      </Col>
     </Row>
  </div>;
};  


export default Track;