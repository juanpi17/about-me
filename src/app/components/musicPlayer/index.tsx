'use client'

import React, { useEffect, useRef, useState, MouseEvent } from "react";
import Hls from "hls.js";
import { BsPlayFill, BsPauseFill, BsStopFill, BsSkipBackwardFill, BsSkipForwardFill } from "react-icons/bs";
import { ImSpinner } from "react-icons/im";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import { StaticImageData } from 'next/image';

import { CommonWindowProps } from "@/types";
import { useWindowElementsContext } from "@/context/windowElementsContext";
import CloseIcon from "@/components/svg/closeIcon";
import { handleClose, handleOnTop } from "@/utils/events";
import classNames from "classnames";
import WaveForm from "./WaveForm";

interface Track {
  title: string;
  url: string;
  type: "mp3" | "stream";
  home?: string;
  cover?: StaticImageData;
}

interface AnalyserDataType {
  analyser: AnalyserNode;
  bufferLength: number;
  dataArray: Uint8Array;
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

export const MusicPlayer = (props: CommonWindowProps) => {
  const { windowElements, setWindowElements, historyClickedElements, setHistoryClickedElements } = useWindowElementsContext();
  const { attributes, listeners, setNodeRef, transform, setActivatorNodeRef } = useDraggable({
    id: props.id || 'draggable',
  });

  const { id, element, titleName = 'Music Player', extendedClasses = [] } = props || {};
  const { onTop, position } = element || {};

  const style = {
    transform: CSS.Translate.toString(transform),
    ...(position
      ? {
        left: position.left,
        top: position.top,
      }
      : {}),
    ...(onTop 
      ? { zIndex: 2 } 
      : { zIndex: 0 }
    ),
  };

  const customHandleClose = (event: MouseEvent<HTMLButtonElement>) => {
    handleClose({event, currentWindowId: id, windowElements, setWindowElements, historyClickedElements});
  };

  const customHandleOnTop = () => {
    handleOnTop({ currentWindowId: id, windowElements, setWindowElements, setHistoryClickedElements});
  };

  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [volume, setVolume] = useState<number>(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isPlaylistEnabled, setIsPlaylistEnabled] = useState(true);
  const [currentColorVolume, setCurrentColorVolume] = useState(getGradientColor(volume));

  const currentTrack = tracks[currentTrackIndex];

  const [analyserData, setAnalyserData] = useState<AnalyserDataType | null>(null);

  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  const audioAnalyzer = () => {
    if (!audioRef.current) return;

    // if context and source already exists, just update the analyser
    if (!audioCtxRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (!sourceRef.current) {
      sourceRef.current = audioCtxRef.current.createMediaElementSource(audioRef.current);
    }
    if (!analyserRef.current) {
      analyserRef.current = audioCtxRef.current.createAnalyser();
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioCtxRef.current.destination);
    }

    analyserRef.current.fftSize = 256;
    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    setAnalyserData({ analyser, bufferLength, dataArray });
  };

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
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      sourceRef.current = null;
      analyserRef.current = null;
    };
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

        hls.on(Hls.Events.BUFFER_APPENDED, () => {
          setIsBuffering(false);
        });

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
      audioRef.current.play().catch(error => {
        console.error("Error al intentar reproducir:", error);
        setIsPlaying(false);
      });
      audioAnalyzer();
      setIsPlaying(true);
      setIsStopped(false);
    }
  };

  const togglePause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      setIsStopped(false);
    }
  };

  const toggleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsStopped(true);
    }
  };

  const skipForward = () => {
    setCurrentTrackIndex((prevIndex) => {
      const currentTrack = tracks[prevIndex];
      const similarTracks = tracks.filter(t => t.type === currentTrack.type);
      const currentSimilarIndex = similarTracks.findIndex(t => t.title === currentTrack.title && t.type === currentTrack.type);
      const nextSimilarIndex = (currentSimilarIndex + 1) % similarTracks.length;
      const nextTrack = similarTracks[nextSimilarIndex];
      
      return tracks.findIndex(t => t.title === nextTrack.title && t.type === nextTrack.type);
    });
    setTimeout(() => {
      togglePlay();
    }, 0);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prevIndex) => {
      const currentTrack = tracks[prevIndex];
      const similarTracks = tracks.filter(t => t.type === currentTrack.type);
      const currentSimilarIndex = similarTracks.findIndex(t => t.title === currentTrack.title && t.type === currentTrack.type);
      const nextSimilarIndex = (currentSimilarIndex - 1 + similarTracks.length) % similarTracks.length;
      const nextTrack = similarTracks[nextSimilarIndex];
      
      return tracks.findIndex(t => t.title === nextTrack.title && t.type === nextTrack.type);
    });
    setTimeout(() => {
      togglePlay();
    }, 0);
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

  const handleClickPlaylist = (index: number) => {
    setCurrentTrackIndex(index);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
      setIsStopped(false);
      setIsPlaying(false);
      togglePlay();
    }, 0);
  }

  const IsPlayerReady = ({children} : {children: React.JSX.Element}) => (
    <>
    {isLoading ? (
          <div className="flex flex-col items-center p-2">
            <ImSpinner className="animate-spin text-4xl mb-2" />
            <p>Cargando audio...</p>
          </div>
        ) : isBuffering ? (
          <div className="flex flex-col items-center p-2">
            <ImSpinner className="animate-spin text-4xl mb-2" />
            <p>Buffering...</p>
          </div>
        ) : (
          <>{children}</>
        )}
    </>
  );

  const isReady = !isLoading && !isBuffering && currentTrack && currentTrack.title && currentTrack.url;

  const buttonSize = 24;

  const CurrentStateIcon = ({size = 28}: {size: number}) => isPlaying ? <BsPlayFill size={size} /> : (isStopped ? <BsStopFill size={size} /> : <BsPauseFill size={size} />);

  if (!element || !element.visible) {
    return null;
  }
  
  return (
    <div onClick={customHandleOnTop} ref={setNodeRef} style={style} className={`absolute ${classNames(extendedClasses)}`}>
      <div className={`absolute left-0 top-[-2rem] h-[2rem] header flex flex-row items-center gap-2 ${onTop ? 'bg-(--default-yellow-soft)' : 'bg-(--default-light-gray)'} border border-(--default-light-gray) rounded-t-lg border-b-0 w-fit px-1 pr-3 hover:cursor-grab max-w-3/4` } >
        <button type='button' onClick={customHandleClose} className={`w-auto ${onTop ? 'bg-(--default-yellow)' : 'bg-(--default-light-gray)' } focus:outline-none rounded-xs hover:bg-red-600`}>
          <CloseIcon />
        </button>
        <div ref={setActivatorNodeRef} {...listeners} {...attributes} className='flex-grow p-1 overflow-hidden whitespace-nowrap text-ellipsis'>
          <span className="title text-md font-bold text-black font-[family-name:var(--font-custom)]">{titleName}</span>
        </div>
      </div>
      <div className="flex flex-col items-center p-2 bg-[#27283d] w-100 font-[family-name:var(--font-music-player)] text-(--default-music-player-text)">
        <audio ref={audioRef} />

        <div className="flex flex-col w-full border-2 border-[#3a3846] bg-gradient-to-br from-[#101018] via-[#3b3856] to-[#26283a]">
          <div className="grid grid-cols-5 grid-rows-3 w-full gap-x-3 h-fit">
            <div className="flex col-start-1 col-span-2 row-start-1 row-span-3 mb-3 bg-black items-center justify-center border-2 border-solid border-t-[#3a3846] border-l-[#3a3846] border-r-[#6c6d78] border-b-[#6c6d78]">
              <div className="flex flex-col w-full h-full">
                <IsPlayerReady>
                  <>
                    <div className="flex flex-row w-full h-fit items-center justify-start gap-6 px-4">
                      <CurrentStateIcon size={20}/>
                      <p className="text-3xl text-center">{formatTime(currentTime)}</p>
                    </div>
                    <div className="relative flex flex-row h-full mx-2 mb-2">
                      {analyserData && <WaveForm analyserData={analyserData} />}
                    </div>
                  </>
                </IsPlayerReady>
              </div>
            </div>
            <div className="flex col-start-3 col-span-3 bg-black items-center border-2 border-solid border-t-[#3a3846] border-l-[#3a3846] border-r-[#6c6d78] border-b-[#6c6d78] overflow-hidden">
              {isReady ? (
                <div className="flex flex-row px-2 gap-2 animate-move">
                  <span className="text-nowrap">{currentTrack.title}</span>
                  {duration > 0 && currentTrack.type === 'mp3' && (
                    <span>{'<' + formatTime(duration) + '>'}</span>
                  )}
                </div>
              ) : null}
            </div>
            <div className="flex col-start-3 col-span-3 row-start-2 w-full justify-end gap-4 px-2 items-center text-[#5e6e78] text-xs font-black cursor-default">
              <p className={`${isReady && currentTrack.type === 'stream' ? 'text-green-200 text-shadow-md text-shadow-green-500' : '' }`}>STREAMING</p>
              <p className={`${isReady && currentTrack.type === 'stream' ? '' : 'text-green-200 text-shadow-md text-shadow-green-500' }`}>LOCAL</p>
            </div>
            <div className="flex col-start-3 col-span-3 row-start-3 items-center justify-between gap-2 pr-1">
              {isReady ? (
                <>
                  <input type="range" min={0} max={1} step="any" value={volume} style={volumeBarStyle} onChange={handleVolumeChange} className="custom-slider appearance-none h-2 rounded-2xl" />
                  <button className="flex flex-row text-xs justify-start items-center gap-2 text-[#5e6e78] bg-[#bccfd8] border-3 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-1 active:translate-1/25 active:shadow-2xl"
                    onClick={handlePlaylist}>
                    <span className={`border border-[#3a3846] p-1 ${isPlaylistEnabled ? 'bg-green-500 outline-1 outline-gray-200' : ''}`}></span>
                    <span className="font-bold">PLAYLIST</span>
                  </button>
                </>
              ) : null}
            </div>
          </div>
          <div className="flex w-full mb-2 h-fit">
            {isReady ? (
              <input type="range" min={0} max={1} step="any" value={currentTime / duration} onChange={handleProgressClick} disabled={currentTrack.type === 'stream'} className="custom-progress-slider appearance-none w-full h-4 bg-black border-2 border-solid border-t-[#3a3846] border-l-[#3a3846] border-r-[#6c6d78] border-b-[#6c6d78]" />
            ) : null}
          </div>
          <div className="flex w-full p-1 gap-1">
            <button className="relative text-[#5e6e78] bg-[#bccfd8] border-3 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-2 active:translate-1/25 active:shadow-2xl" onClick={skipBackward}>
              <BsSkipBackwardFill size={buttonSize} />
            </button>
            <button className="text-[#5e6e78] bg-[#bccfd8] border-3 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-2 active:translate-1/25 active:shadow-2xl" onClick={togglePlay}>
              <BsPlayFill size={buttonSize} />
            </button>
            <button className="text-[#5e6e78] bg-[#bccfd8] border-3 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-2 active:translate-1/25 active:shadow-2xl" onClick={togglePause}>
              <BsPauseFill size={buttonSize} />
            </button>
            <button className="text-[#5e6e78] bg-[#bccfd8] border-3 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-2 active:translate-1/25 active:shadow-2xl" onClick={toggleStop}>
              <BsStopFill size={buttonSize} />
            </button>
            <button className="text-[#5e6e78] bg-[#bccfd8] border-3 border-b-[#3a3846] border-r-[#3a3846] border-t-[#f0fdfe] border-l-[#f0fdfe] px-2 active:translate-1/25 active:shadow-2xl" onClick={skipForward}>
              <BsSkipForwardFill size={buttonSize} />
            </button>
          </div>
        </div>
        
        {isReady && isPlaylistEnabled ? (
          <div className="flex flex-col w-full m-1">
            <div className="flex flex-col border-3 border-[#3a3846]">
              <div className="flex flex-row w-full gap-5 p-2 items-center">
                <h4 className="font-semibold text-sm text-[#f0fdfe] text-center">STREAMING</h4>
                <ul className="flex">
                  {tracks.map((track, index) => {
                    if (track.type !== 'stream') return;
                    return (
                      <li
                        key={index}
                        className={`cursor-pointer px-2 mr-1 ${index === currentTrackIndex ? "bg-[#0100c6] text-white" : "hover:bg-gray-700"}`}
                        onClick={() => handleClickPlaylist(index)}
                      >
                        {track.title}
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="flex flex-row w-full gap-3 p-2 text-nowrap bg-black overflow-y-auto">
                <ul className="flex flex-col w-full">
                  {tracks.map((track, index) => {
                    if (track.type !== 'mp3') return;
                    return (
                      <li
                        key={index}
                        className={`cursor-pointer px-2 ${index === currentTrackIndex ? "bg-[#0100c6] text-white" : "hover:bg-gray-700"}`}
                        onClick={() => handleClickPlaylist(index)}
                      >
                        <span className="flex flex-row w-full h-fit gap-2">
                          <span>{index + 1}.</span>
                          <span>{track.title}</span>
                        </span>
                        
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};
