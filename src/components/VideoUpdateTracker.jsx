import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoUpdateTracker = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-center gradient-text">
          Video Updates
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-700 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Video Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 group">
        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/media/vid2.mp4" type="video/mp4" />
            {/* Fallback content for when video is not available */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
              <div className="text-center text-white p-4 sm:p-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20">
                  <Play className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 opacity-75" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Video Coming Soon</h3>
                  <p className="text-base sm:text-lg opacity-90 mb-2">Latest dgit Development Progress</p>
                  <p className="text-xs sm:text-sm opacity-75">Add your video file to /public/media/vid2.mp4</p>
                </div>
              </div>
            </div>
          </video>
          
          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
              <div className="flex gap-2">
                <button
                  onClick={toggleMute}
                  className="bg-white/15 backdrop-blur-md rounded-full p-2 sm:p-3 border border-white/20 text-white hover:bg-white/25 transition-colors duration-200"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
                <button
                  onClick={togglePlayPause}
                  className="bg-white/15 backdrop-blur-md rounded-full p-2 sm:p-3 border border-white/20 text-white hover:bg-white/25 transition-colors duration-200"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpdateTracker;