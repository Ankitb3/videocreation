import axios from 'axios';

const YouTubeUpload = async (videoFile, title, description, tags) => {
  try {
    const formData = new FormData();
    formData.append('media', videoFile);

    const accessToken = import.meta.env.VITE_ACCESS_TOEKEN

    const mediaUploadResponse = await axios.post(
      `https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        params: {
          snippet: JSON.stringify({
            title,
            description,
            tags,
          }),
          status: JSON.stringify({
            privacyStatus: 'public',
          }),
        },
      }
    );

    console.log('YouTube Upload Response:', mediaUploadResponse);
  } catch (error) {
    console.error('Error uploading to YouTube:', error);
    throw new Error('Failed to upload video to YouTube');
  }
};

export default YouTubeUpload;



