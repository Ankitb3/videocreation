import React, { useState } from 'react';
import { Tabs, Input, Button, Spin, notification } from 'antd';
import InstagramUpload from '../components/InstagramUpload';
import YouTubeUpload from '../components/YouTubeUpload';

const { TabPane } = Tabs;

const UploadTabs = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitInstagram = async () => {
    setLoading(true);
    try {
      await InstagramUpload(videoFile);
      notification.success({ message: 'Video uploaded successfully to Instagram!' });
    } catch (error) {
      notification.error({ message: 'Error uploading to Instagram' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitYouTube = async () => {
    setLoading(true);
    try {
      await YouTubeUpload(videoFile, title, description, tags.split(','));
      notification.success({ message: 'Video uploaded successfully to YouTube!' });
    } catch (error) {
      notification.error({ message: 'Error uploading to YouTube' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Instagram Reels" key="1">
        <div className="upload-form">
          <Input
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="mb-4"
            required
          />
          <Button
            type="primary"
            onClick={handleSubmitInstagram}
            disabled={loading || !videoFile}
            loading={loading}
          >
            {loading ? <Spin /> : 'Upload to Instagram'}
          </Button>
        </div>
      </TabPane>
      <TabPane tab="YouTube Shorts" key="2">
        <div className="upload-form">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
            required
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4"
            required
          />
          <Input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mb-4"
          />
          <Input
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="mb-4"
            required
          />
          <Button
            type="primary"
            onClick={handleSubmitYouTube}
            disabled={loading || !videoFile || !title || !description}
            loading={loading}
          >
            {loading ? <Spin /> : 'Upload to YouTube'}
          </Button>
        </div>
      </TabPane>
    </Tabs>
  );
};

export default UploadTabs;
