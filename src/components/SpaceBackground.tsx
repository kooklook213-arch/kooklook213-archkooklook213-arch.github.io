import { useRef } from 'react';

export default function SpaceBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = Math.max(0, video.duration * 0.42);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    const loopEnd = video.duration * 0.92;
    if (video.currentTime >= loopEnd) {
      video.currentTime = video.duration * 0.42;
    }
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        className="h-full w-full object-cover object-center"
      >
        <source src="/77231-561602356_medium.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/45" />
    </div>
  );
}
