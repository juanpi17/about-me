import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { BsPlayFill, BsPauseFill, BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs";
import { ImSpinner } from "react-icons/im";

interface Track {
  title: string;
  url: string;
  type: "mp3" | "m3u8";
}

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch("/tracks.json");
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error("Error al cargar las canciones:", error);
      }
    };

    fetchTracks();
  }, []);

  useEffect(() => {
    if (audioRef.current && tracks.length > 0) {
      const track = tracks[currentTrackIndex];

      if (track.type === "m3u8" && Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(track.url);
        hls.attachMedia(audioRef.current);
      } else {
        audioRef.current.src = track.url;
      }

      audioRef.current.addEventListener("canplay", () => setIsLoading(false));
    }
  }, [currentTrackIndex, tracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      audio.addEventListener("timeupdate", updateTime);
      audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
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
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
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
      ) : (
        <>
          <div className="mb-4 text-lg">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button className="text-gray-300 hover:text-white transition" onClick={skipBackward}>
              <BsSkipBackwardFill size={24} />
            </button>
            <button className="bg-blue-500 p-3 rounded-full text-white hover:bg-blue-600 transition" onClick={togglePlayPause}>
              {isPlaying ? <BsPauseFill size={28} /> : <BsPlayFill size={28} />}
            </button>
            <button className="text-gray-300 hover:text-white transition" onClick={skipForward}>
              <BsSkipForwardFill size={24} />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Lista de Canciones</h3>
            <ul className="mt-2">
              {tracks.map((track, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-2 ${index === currentTrackIndex ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`}
                  onClick={() => setCurrentTrackIndex(index)}
                >
                  {track.title}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
