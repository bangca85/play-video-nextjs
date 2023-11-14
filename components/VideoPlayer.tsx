import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  playing: boolean;
  onProgress: (state: { playedSeconds: number }) => void;
}
const VideoPlayer: React.FC<VideoPlayerProps & { currentSubtitle: string }> = ({
  url,
  playing,
  onProgress,
  currentSubtitle,
}) => {
  return (
    <div className="relative" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      <ReactPlayer
        url={url}
        playing={playing}
        controls
        onProgress={onProgress}
      />
     <div 
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white p-2 rounded text-center max-w-90% break-words bg-blue-400/50"
>
    {currentSubtitle}
</div> 
    </div>
  );
};

export default VideoPlayer;
