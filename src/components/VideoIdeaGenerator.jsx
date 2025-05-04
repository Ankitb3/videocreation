

import React, { useState } from 'react';
import axios from 'axios';

const VideoContentGenerator = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleGenerate = async () => {
    if (topic.trim().length === 0 || tone.trim().length === 0) {
      setError('Please fill in both fields before generating.');
      return;
    }

    setLoading(true);
    setError('');
    setMessages([
      ...messages,
      { role: 'user', content: `Topic: ${topic}, Tone: ${tone}` },
    ]);

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that generates creative video script ideas.',
            },
            {
              role: 'user',
              content: `Generate a video script idea for the topic: "${topic}" with a ${tone} tone.`,
            },
          ],
          max_tokens: 200,
        },
        {
          headers: {
            Authorization: 'Bearer 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',
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'Video Idea Generator',
          },
        }
      );

      const content = response.data.choices?.[0]?.message?.content;
      setMessages([
        ...messages,
        { role: 'assistant', content: content || 'No content returned.' },
      ]);
    } catch (err) {
      setMessages([
        ...messages,
        { role: 'assistant', content: 'Failed to generate idea. Try again.' },
      ]);
    } finally {
      setLoading(false);
      setTopic('');
      setTone('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[70%] border border-gray-200">
        <h1 className="text-2xl font-bold text-indigo-600 mb-6 text-center">🎬 Video Idea Generator</h1>

        {/* Chat Area */}
        <div className="mb-6 h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs py-2 px-4 rounded-lg ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xs py-2 px-4 rounded-lg bg-gray-200 text-gray-800">
                <p className="text-sm">...</p>
              </div>
            </div>
          )}
        </div>

        {/* User Input - Fixed Inputs in One Line */}
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic"
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          >
            <option value="" disabled>Select Tone</option>
            <option value="funny">Funny</option>
            <option value="serious">Serious</option>
            <option value="informative">Informative</option>
            <option value="motivational">Motivational</option>
            <option value="inspirational">Inspirational</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-2 rounded-md font-semibold text-white transition duration-200 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {loading ? 'Generating...' : 'Generate Idea'}
        </button>

        {/* Error */}
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default VideoContentGenerator;
