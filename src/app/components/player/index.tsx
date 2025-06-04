import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { ImSpinner } from "react-icons/im";
import { RiReplay10Fill, RiForward10Fill } from "react-icons/ri";

interface MusicPlayerProps {
  src: string; // URL del archivo M3U8
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMetadataLoading, setIsMetadataLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    if (Hls.isSupported() && audioRef.current) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(audioRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("M3U8 cargado correctamente");
        setIsLoading(false);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
          console.log("Buffering...");
          setIsBuffering(true);
        }
      });

      hls.on(Hls.Events.BUFFER_APPENDED, () => setIsBuffering(false));

      return () => {
        hls.destroy();
      };
    } else if (audioRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      audioRef.current.src = src;
      audioRef.current.addEventListener("canplay", () => setIsLoading(false));
    }
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || currentTime + 1);
      };

      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
        setIsMetadataLoading(false);
      });

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - left;
      const newTime = (clickX / width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="absolute left-50 top-30 flex flex-col items-center p-6 bg-gray-800 text-white rounded-lg shadow-lg w-96">
      <audio ref={audioRef} />

      {isLoading ? (
        <div className="flex flex-col items-center">
          <ImSpinner className="animate-spin text-white text-4xl mb-2" />
          <p>Cargando audio...</p>
        </div>
      ) : isMetadataLoading ? (
        <div className="flex flex-col items-center">
          <ImSpinner className="animate-spin text-white text-4xl mb-2" />
          <p>Cargando metadata...</p>
        </div>
      ) : isBuffering ? (
        <div className="flex flex-col items-center">
          <ImSpinner className="animate-spin text-white text-4xl mb-2" />
          <p>Buffering...</p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-lg">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <div
            className="w-full h-2 bg-gray-600 rounded cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div
              className="h-2 bg-blue-500 rounded absolute top-0 left-0"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button className="text-gray-300 hover:text-white transition" onClick={skipBackward}>
              <RiReplay10Fill size={24} />
            </button>
            <button className="bg-blue-500 p-3 rounded-full text-white hover:bg-blue-600 transition" onClick={togglePlayPause}>
              {isPlaying ? <BsPauseFill size={28} /> : <BsPlayFill size={28} />}
            </button>
            <button className="text-gray-300 hover:text-white transition" onClick={skipForward}>
              <RiForward10Fill size={24} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
