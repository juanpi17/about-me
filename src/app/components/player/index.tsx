'use client'

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { BsPlayFill, BsPauseFill, BsStopFill, BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs";
import { ImSpinner } from "react-icons/im";

interface Track {
  title: string;
  url: string;
  type: "mp3" | "stream";
}

const getGradientColor = (normalizedPosition: number, firstColor: string = '#61de36', lastColor: string = '#c02638', defaultColor: string = '#000'): string => {
  if (typeof window === "undefined") {
    return defaultColor; // Avoid executing in SSR
  }
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return defaultColor; // Color by default if no context

  canvas.width = 101;
  canvas.height = 1;

  const position = parseFloat((normalizedPosition * 100).toFixed(0));

  const grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grd.addColorStop(0, firstColor);
  grd.addColorStop(1, lastColor);

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const pixelData = ctx.getImageData(position, 0, 1, 1).data;
  return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
};

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isPlaylistEnabled, setIsPlaylistEnabled] = useState(true);
  const [currentColorVolume, setCurrentColorVolume] = useState(getGradientColor(volume));

  const currentTrack = tracks[currentTrackIndex];

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

      if (track.type === "stream" && Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(track.url);
        hls.attachMedia(audioRef.current);

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
            console.log("Buffering...");
            setIsBuffering(true);
          }
        });

        hls.on(Hls.Events.BUFFER_APPENDED, () => setIsBuffering(false));

      } else {
        audioRef.current.src = track.url;
      }

      audioRef.current.addEventListener("canplay", () => setIsLoading(false));
    }
  }, [currentTrackIndex, tracks]);

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
      });

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
      if (audioRef.current) { audioRef.current.volume = volume; }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const togglePause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleStop = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setVolume(parseFloat(e.target.value));
    const color = parseFloat(e.target.value);

    setCurrentColorVolume(getGradientColor(color));
  };

  const volumeBarStyle = {
    backgroundColor: currentColorVolume
  }

  const handlePlaylist = () => { setIsPlaylistEnabled(!isPlaylistEnabled); };

  const handleProgressClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = parseFloat(e.target.value) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
  //   if (audioRef.current) {
  //     const { left, width } = event.currentTarget.getBoundingClientRect();
  //     const clickX = event.clientX - left;
  //     const newTime = (clickX / width) * duration;
  //     audioRef.current.currentTime = newTime;
  //     setCurrentTime(newTime);
  //   }
  // };
  
  return (
    <div className="absolute left-50 top-30 flex flex-col items-center p-2 bg-[#27283d] w-120">
      <audio ref={audioRef} />

      {isLoading ? (
        <div className="flex flex-col items-center">
          <ImSpinner className="animate-spin text-white text-4xl mb-2" />
          <p>Cargando audio...</p>
        </div>
      ) : isBuffering ? (
        <div className="flex flex-col items-center">
          <ImSpinner className="animate-spin text-white text-4xl mb-2" />
          <p>Buffering...</p>
        </div>
      ) : (
        <>
        <div className="flex flex-col w-full border-2 border-[#3a3846] bg-gradient-to-br from-[#292a3d] via-[#343752] to-[#292a3d]">
          <div className="grid grid-cols-2 grid-rows-3 w-full gap-x-3">
            <div className="flex row-span-3 bg-black items-center justify-center border-2 border-solid border-t-[#3a3846] border-l-[#3a3846] border-r-[#6c6d78] border-b-[#6c6d78]">
              <p className="text-3xl text-center text-white">{formatTime(currentTime)} / {formatTime(duration)}</p>
            </div>
            <div className="flex col-start-2 bg-black items-center border-2 border-solid border-t-[#3a3846] border-l-[#3a3846] border-r-[#6c6d78] border-b-[#6c6d78]">
              <p className="text-white p-1 px-2">{currentTrack.title}</p>
            </div>
            <div className="flex w-full justify-end gap-4 px-2 items-center row-start-2 col-start-2 text-[#f0fdfe] text-xs font-black">
              <p className={`${currentTrack.type === 'stream' ? 'text-green-200 text-shadow-md text-shadow-green-500' : '' }`}>streaming</p>
              <p className={`${currentTrack.type === 'stream' ? '' : 'text-green-200 text-shadow-md text-shadow-green-500' }`}>local</p>
            </div>
            <div className="flex row-start-3 col-start-2 items-center gap-3 pr-1">
              <input type="range" min={0} max={1} step="any" value={volume} style={volumeBarStyle} onChange={handleVolumeChange} className="custom-slider appearance-none w-full h-2 bg-amber-500 rounded-2xl" />
              <button className="flex text-sm justify-between items-center gap-2 text-[#5e6e78] bg-[#bccfd8] border-2 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-1 active:translate-1/25 active:shadow-2xl"
                onClick={handlePlaylist}>
                <span className={`border border-[#3a3846] p-1 ${isPlaylistEnabled ? 'bg-green-500 outline-1 outline-gray-200' : ''}`}></span>
                <span className="font-bold">PL</span>
              </button>
            </div>
          </div>
          <div className="flex w-full p-1 my-1 h-fit">
            <input type="range" min={0} max={1} step="any" value={currentTime / duration} onChange={handleProgressClick} disabled={currentTrack.type === 'stream'} className="custom-progress-slider appearance-none w-full h-6 bg-black border-2 border-solid border-t-[#3a3846] border-l-[#3a3846] border-r-[#6c6d78] border-b-[#6c6d78]" />
          </div>
          <div className="flex w-full p-1 gap-1">
            <button className="text-[#5e6e78] bg-[#bccfd8] border-2 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-2 active:translate-1/25 active:shadow-2xl" onClick={skipBackward}>
              <BsSkipBackwardFill size={28} />
            </button>
            <button className="text-[#5e6e78] bg-[#bccfd8] border-2 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-2 active:translate-1/25 active:shadow-2xl" onClick={togglePlay}>
              <BsPlayFill size={28} />
            </button>
            <button className="text-[#5e6e78] bg-[#bccfd8] border-2 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-2 active:translate-1/25 active:shadow-2xl" onClick={togglePause}>
              <BsPauseFill size={28} />
            </button>
            <button className="text-[#5e6e78] bg-[#bccfd8] border-2 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-2 active:translate-1/25 active:shadow-2xl" onClick={toggleStop}>
              <BsStopFill size={28} />
            </button>
            <button className="text-[#5e6e78] bg-[#bccfd8] border-2 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-2 active:translate-1/25 active:shadow-2xl" onClick={skipForward}>
              <BsSkipForwardFill size={28} />
            </button>
          </div>
        </div>
        
        {isPlaylistEnabled ? (
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
        ) : null}
        </>
      )}
    </div>
  );

  // return (
  //   <div className="absolute left-50 top-30 flex flex-col items-center p-6 bg-gray-800 text-white rounded-lg shadow-lg w-96">
  //     <audio ref={audioRef} />

  //     {isLoading ? (
  //       <div className="flex flex-col items-center">
  //         <ImSpinner className="animate-spin text-white text-4xl mb-2" />
  //         <p>Cargando audio...</p>
  //       </div>
  //     ) : (
  //       <>
  //         <div className="mb-4 text-lg">
  //           {formatTime(currentTime)} / {formatTime(duration)}
  //         </div>

  //         <div className="flex justify-center items-center gap-4 mt-4">
  //           <button className="text-gray-300 hover:text-white transition" onClick={skipBackward}>
  //             <BsSkipBackwardFill size={24} />
  //           </button>
  //           <button className="bg-blue-500 p-3 rounded-full text-white hover:bg-blue-600 transition" onClick={togglePlayPause}>
  //             {isPlaying ? <BsPauseFill size={28} /> : <BsPlayFill size={28} />}
  //           </button>
  //           <button className="text-gray-300 hover:text-white transition" onClick={skipForward}>
  //             <BsSkipForwardFill size={24} />
  //           </button>
  //         </div>

  //         <div className="mt-4">
  //           <h3 className="text-lg font-semibold">Lista de Canciones</h3>
  //           <ul className="mt-2">
  //             {tracks.map((track, index) => (
  //               <li
  //                 key={index}
  //                 className={`cursor-pointer p-2 ${index === currentTrackIndex ? "bg-blue-500 text-white" : "hover:bg-gray-700"}`}
  //                 onClick={() => setCurrentTrackIndex(index)}
  //               >
  //                 {track.title}
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
};

export default MusicPlayer;
