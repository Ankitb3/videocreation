import axios from 'axios';

const InstagramUpload = async (videoFile, caption) => {
  try {
    const formData = new FormData();
    formData.append('media', videoFile);

    const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN';

    const mediaUploadResponse = await axios.post(
      `https://graph-video.facebook.com/v11.0/USER_ID/media?access_token=${accessToken}`,
      formData
    );

    const mediaId = mediaUploadResponse.data.id;

    const publishResponse = await axios.post(
      `https://graph.facebook.com/v11.0/USER_ID/media_publish?access_token=${accessToken}`,
      {
        creation_id: mediaId,
      }
    );

    console.log('Instagram Upload Response:', publishResponse);
  } catch (error) {
    console.error('Error uploading to Instagram:', error);
    throw new Error('Failed to upload video to Instagram');
  }
};

export default InstagramUpload;
