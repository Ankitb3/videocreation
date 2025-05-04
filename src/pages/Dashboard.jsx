import React, { useState } from 'react';

const ContentDashboard = () => {
  // Sample video data
  const videos = [
    {
      id: 1,
      title: "Understanding React",
      status: "published",
      views: 1200,
      likes: 350,
      date: "2023-04-12",
    },
    {
      id: 2,
      title: "TailwindCSS Basics",
      status: "draft",
      views: 500,
      likes: 150,
      date: "2023-03-08",
    },
    {
      id: 3,
      title: "JavaScript ES6 Features",
      status: "failed",
      views: 200,
      likes: 25,
      date: "2023-02-20",
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVideos = videos.filter((video) => {
    const matchesSearchQuery =
      video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || video.status === statusFilter;

    return matchesSearchQuery && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
          Content Dashboard
        </h1>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="ml-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.length === 0 ? (
            <p className="col-span-3 text-center text-gray-500">
              No videos match your search or filter criteria.
            </p>
          ) : (
            filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-indigo-600 mb-4">
                  {video.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">{video.date}</p>

                <div
                  className={`inline-block px-4 py-1 text-sm font-medium rounded-full ${
                    video.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : video.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  } mb-4`}
                >
                  {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div>
                    <p className="font-semibold">Views: {video.views}</p>
                    <p>Likes: {video.likes}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentDashboard;
