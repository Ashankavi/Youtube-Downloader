// src/Components/YouCon.jsx
import React, { useState } from 'react';
import axios from 'axios';

const YouCon = () => {
  const [videoLink, setVideoLink] = useState('');
  const [videoDetails, setVideoDetails] = useState(null);
  const [quality, setQuality] = useState('mp3');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const fetchVideoDetails = async () => {
    try {
      const videoId = new URL(videoLink).searchParams.get('v'); // Extract video ID from URL
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: 'snippet,contentDetails',
          id: videoId,
          key: 'AIzaSyCFf8gKt1ryhAfuOtxrVLEmxPFcSiy6ZYU',
        },
      });

      if (response.data.items.length === 0) {
        throw new Error('Video not found');
      }

      const videoData = response.data.items[0];
      const duration = videoData.contentDetails.duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      const formattedDuration = `${duration[1] ? duration[1].slice(0, -1) + ':' : ''}${duration[2] ? duration[2].slice(0, -1).padStart(2, '0') + ':' : '00:'}${duration[3] ? duration[3].slice(0, -1).padStart(2, '0') : '00'}`;

      const details = {
        videoTitle: videoData.snippet.title,
        description: videoData.snippet.description,
        publishDate: videoData.snippet.publishedAt.split('T')[0],
        videoDuration: formattedDuration,
        thumbnail: videoData.snippet.thumbnails.high.url,
      };

      setVideoDetails(details);
    } catch (error) {
      console.error('Failed to fetch video details:', error.message);
    }
  };

  const handleDownload = () => {
    if (!videoDetails) return;

    const videoId = new URL(videoLink).searchParams.get('v');
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const downloadUrl = `http://localhost:5000/download?url=${encodeURIComponent(videoUrl)}&format=${quality}`;

    window.open(downloadUrl, '_blank');
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="flex flex-col items-center w-full h-full min-h-screen py-20 text-white bg-black">

      <h1 className="px-8 pb-8 mb-4 text-5xl font-bold text-center uppercase">
        <span className='text-[#ff0000] hover:text-[#ff0000b9]'>YouTube</span> Video Downloader
      </h1>

      <div className="flex justify-center w-full px-8 py-8 mb-4">
        <div className="w-[800px]">
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            placeholder="Enter YouTube video link"
            className="w-full rounded-[10px] pl-2 pr-2 text-black py-2"
          />
          <button
            onClick={fetchVideoDetails}
            className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% font-bold uppercase text-white p-2 mt-2 w-full rounded-[10px]"
          >
            Search
          </button>
        </div>
      </div>

      {videoDetails && (
        <div className="w-full max-w-[800px] flex flex-col items-center px-8">
          <div className="flex flex-col items-center justify-center w-full gap-10 mb-4 md:flex-row">
            <img src={videoDetails.thumbnail} alt="Thumbnail" className="w-64 h-64 mb-4 md:mb-0 md:mr-4" />
            <div className="text-2xl text-center md:text-left">
              <p className='text-3xl mb-4 text-[#23d443] hover:text-[#30ff5d]'><strong>Video Title:</strong> {videoDetails.videoTitle}</p>
              <p>
                <strong className='mb-2 '>Description:</strong> {isDescriptionExpanded ? videoDetails.description : `${videoDetails.description.substring(0, 100)}...`}
                <button onClick={toggleDescription} className="mb-8 ml-2 font-semibold text-blue-500">
                  {isDescriptionExpanded ? 'Show Less' : 'Show More'}
                </button>
              </p>
              <p><strong>Publish Date:</strong> {videoDetails.publishDate}</p>
              <p><strong>Video Duration:</strong> {videoDetails.videoDuration}</p>
            </div>
          </div>

          <div className="w-full py-8 mt-4">
            <label htmlFor="quality" className="block mb-2 text-lg">Select Type:</label>
            <select
              id="quality"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full text-black pl-2 pr-2 py-2 rounded-[10px]"
            >
              <option value="mp3">MP3 Download</option>
              <option value="mp4_360">MP4 Download 360p</option>
              <option value="mp4_720">MP4 Download 720p</option>
            </select>
          </div>

          <div className="flex justify-center w-full">
            <button
              onClick={handleDownload}
              className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% font-bold uppercase text-white p-2 mt-2 w-full rounded-[10px]"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouCon;
