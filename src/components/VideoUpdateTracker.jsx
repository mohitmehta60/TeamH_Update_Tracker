import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="w-full max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 py-6 xs:py-8 sm:py-12 md:py-16">
      {/* Heading */}
      <motion.div 
        className="text-center mb-6 xs:mb-8 sm:mb-12 md:mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.h1 
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 xs:mb-6 sm:mb-8 text-center gradient-text leading-tight"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          Video Updates
        </motion.h1>
        <motion.div 
          className="w-16 xs:w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-purple-500 to-purple-700 mx-auto mt-3 xs:mt-4 sm:mt-6 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "auto" }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Video Section */}
      <motion.div 
        className="relative rounded-2xl xs:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 group"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
      >
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
              <motion.div 
                className="text-center text-white p-4 xs:p-6 sm:p-8 md:p-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 xs:p-6 sm:p-8 md:p-10 border border-white/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Play className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 xs:mb-4 sm:mb-6 opacity-75" />
                  </motion.div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-2 xs:mb-3 sm:mb-4">Video Coming Soon</h3>
                  <p className="text-sm xs:text-base sm:text-lg md:text-xl opacity-90 mb-1 xs:mb-2">Latest dgit Development Progress</p>
                  <p className="text-xs sm:text-sm opacity-75">Add your video file to /public/media/vid2.mp4</p>
                </motion.div>
              </motion.div>
            </div>
          </video>
          
          {/* Video Controls Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="absolute bottom-3 xs:bottom-4 sm:bottom-6 right-3 xs:right-4 sm:right-6">
              <div className="flex gap-2">
                <motion.button
                  onClick={toggleMute}
                  className="bg-white/15 backdrop-blur-md rounded-full p-2 xs:p-3 border border-white/20 text-white hover:bg-white/25 transition-colors duration-200"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted ? <VolumeX className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />}
                </motion.button>
                <motion.button
                  onClick={togglePlayPause}
                  className="bg-white/15 backdrop-blur-md rounded-full p-2 xs:p-3 border border-white/20 text-white hover:bg-white/25 transition-colors duration-200"
                  aria-label={isPlaying ? "Pause" : "Play"}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? <Pause className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" /> : <Play className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoUpdateTracker;