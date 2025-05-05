import React, { useState } from "react";
import axios from "axios";
import { Input, Button, Card, Row, Col, Spin, message } from "antd";

const { Meta } = Card;

function PublicVideos() {
  const [channelId, setChannelId] = useState(""); // The channelId from input
  const [videos, setVideos] = useState([]); // Store fetched videos
  const [loading, setLoading] = useState(false); // Loading state for fetching
  const [error, setError] = useState(""); // Error state for handling errors

  // Fetch videos when the button is clicked
  const fetchVideos = async () => {
    if (!channelId) {
      message.error("Please enter a valid channel ID.");
      return;
    }
    setLoading(true);
    setError(""); // Reset previous errors
    try {
      const response = await axios.get(
        `https://videogenbackend-1.onrender.com/${channelId}`
      );
      setVideos(response.data.videos);
    } catch (err) {
      setError("Failed to fetch videos. Please check the channel ID.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h2>Get Public Videos from YouTube Channel</h2>
      
      {/* Channel ID Input */}
      <Input
        placeholder="Enter YouTube Channel ID"
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
        style={{ width: "300px", marginRight: "10px" }}
      />
      <Button
        type="primary"
        onClick={fetchVideos}
        disabled={loading}
        loading={loading}
      >
        {loading ? <Spin size="small" /> : "Get Videos"}
      </Button>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display fetched videos */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        {videos.length > 0 ? (
          videos.map((video) => (
            <Col span={8} key={video.videoId}>
              <Card
                hoverable
                cover={<img alt="video-thumbnail" src={video.thumbnail} />}
              >
                <Meta title={video.title} description={video.description} />
              </Card>
            </Col>
          ))
        ) : (
          <p>No videos found. Please try again.</p>
        )}
      </Row>
    </div>
  );
}

export default PublicVideos;
