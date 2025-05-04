import React, { useState } from 'react';
import { Tabs, Input,Button, Spin, notification } from 'antd';
import InstagramUpload from '../components/InstagramUpload';
import YouTubeUpload from './YouTubeUpload';
import { FileUpload } from './ui/file-upload';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      notification.error({ message: 'Error uploading to YouTube' });
    } finally {
      setLoading(false);
      setTitle("");
      setTags("")
      setDescription("")
      setTitle("");
      setVideoFile(null)
    }
  };

  return (
    <Tabs defaultActiveKey="1" centered>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <TabPane tab="Instagram Reels" key="1">
        <div className="upload-form">
          {/* <Input
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="mb-4"
            required
          /> */}
          <FileUpload onChange={(e) => setVideoFile(e.target.files[0])} />
          <div className='flex justify-center'>
          <Button
            onClick={handleSubmitInstagram}
            loading={loading}
          >
            {loading ? <Spin /> : 'Upload to Instagram'}
          </Button>
          </div>
         
        </div>
      </TabPane>
      <TabPane tab="YouTube Shorts" key="2">
        <div className='flex justify-center'>
          <div className="upload-form w-[70%] m-4 flex flex-col gap-1 ">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="m-4"
              required
            />
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="m-4"
              required
            />
            <Input
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mb-4"
            />
            {/* <Input
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="mb-4"
            required
          /> */}
            <FileUpload onChange={(files) => setVideoFile(files[0])} />
            <div className='flex justify-center'>
            <Button
              onClick={handleSubmitYouTube}
              loading={loading}
            >
              {loading ? <Spin /> : 'Upload to YouTube'}
            </Button>
</div>
           
          </div>
        </div>

      </TabPane>
    </Tabs>
  );
};

export default UploadTabs;
