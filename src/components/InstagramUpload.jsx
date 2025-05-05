

import React from 'react'
import { useState } from 'react';
import { FileUpload } from './ui/file-upload';
import { Alert, Button } from 'antd';

const InstagramUpload = () => {
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
  return (
    <div> <div className="upload-form">
      <Alert message='Instagram Upload Not Works It will takes some time to complete' type='error'/>
    <FileUpload onChange={(e) => setVideoFile(e.target.files[0])} />
    <div className='flex justify-center'>
    <Button
      onClick={handleSubmitInstagram}
      loading={loading}
    >
      {loading ? <Spin /> : 'Upload to Instagram'}
    </Button>
    </div>
   
  </div></div>
  )
}

export default InstagramUpload