

import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/moving-border';
import { PlaceholdersAndVanishInput } from './ui/placeholders-and-vanish-input';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';

const VideoContentGenerator = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "content",
    },
    {
      text: "with",
    },
    {
      text: "VideoGen.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  const handleGenerate = async () => {
    // if (topic.trim().length === 0 || tone.trim().length === 0) {
    //   setError('Please fill in both fields before generating.');
    //   return;
    // }

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
            'HTTP-Referer': 'http://localhost:5173',
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
      <div className="bg-white shadow-xl rounded-xl p-8 w-[80%] border border-gray-200">
        {/* <h1 className="text-2xl font-bold text-indigo-600 mb-6 text-center">🎬 Video Idea Generator</h1> */}
        <TypewriterEffectSmooth words={words} />

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
          <PlaceholdersAndVanishInput  type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onSubmit={handleGenerate}
            placeholder="Enter a topic"/>
        
        </div>
        


        {/* Error */}
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default VideoContentGenerator;

