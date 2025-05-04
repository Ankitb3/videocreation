import { useState } from 'react';
import YouTubeUpload from '../components/YouTubeUpload';
import InstagramUpload from '../components/InstagramUpload';

const SocialMediaUploadForm = ({ platform }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tagsArray = tags.split(',').map(tag => tag.trim());

    try {
      if (platform === 'youtube') {
        // Call YouTube upload function
        await YouTubeUpload(videoFile, title, description, tagsArray);
      } else if (platform === 'instagram') {
        // Call Instagram upload function
        await InstagramUpload(videoFile, title);
      }

      alert('Video published successfully!');
    } catch (error) {
      console.error('Error publishing video:', error);
      alert('Error uploading video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center item-center mt-10'><form onSubmit={handleSubmit} className="space-y-4 w-[50%]">
    <div>
      <input
        type="file"
        onChange={(e) => setVideoFile(e.target.files[0])}
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <div>
      <input
        type="text"
        placeholder="Enter video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        required
      />
    </div>

    <div>
      <textarea
        placeholder="Enter video description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        required
      />
    </div>

    <div>
      <input
        type="text"
        placeholder="Enter tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <button
      type="submit"
      className={`w-full py-2 rounded-md font-semibold text-white ${
        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
      }`}
      disabled={loading}
    >
      {loading ? 'Uploading...' : 'Publish Video'}
    </button>
  </form></div>
    
  );
};

export default SocialMediaUploadForm;
