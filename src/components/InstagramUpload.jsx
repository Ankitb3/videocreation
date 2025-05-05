// import axios from 'axios';

// const InstagramUpload = async (videoFile, caption) => {
//   try {
//     const formData = new FormData();
//     formData.append('media', videoFile);

//     const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN';

//     const mediaUploadResponse = await axios.post(
//       `https://graph-video.facebook.com/v11.0/USER_ID/media?access_token=${accessToken}`,
//       formData
//     );

//     const mediaId = mediaUploadResponse.data.id;

//     const publishResponse = await axios.post(
//       `https://graph.facebook.com/v11.0/USER_ID/media_publish?access_token=${accessToken}`,
//       {
//         creation_id: mediaId,
//       }
//     );

//     console.log('Instagram Upload Response:', publishResponse);
//   } catch (error) {
//     console.error('Error uploading to Instagram:', error);
//     throw new Error('Failed to upload video to Instagram');
//   }
// };

// export default InstagramUpload;


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