import React, { useEffect, useState } from "react";
import Hls from "hls.js";
import { BsPlayFill } from "react-icons/bs";

interface Channel {
  name: string;
  logo: string;
  url: string;
}

const IPTVPlayer: React.FC<{ playlistUrl: string }> = ({ playlistUrl }) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(playlistUrl);
        const text = await response.text();
        const parsedChannels = parseM3U(text);
        setChannels(parsedChannels);
      } catch (error) {
        console.error("Error al cargar la playlist:", error);
      }
    };

    fetchPlaylist();
  }, [playlistUrl]);

  useEffect(() => {
    if (currentChannel && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(currentChannel.url);
        hls.attachMedia(videoRef.current);
      } else {
        videoRef.current.src = currentChannel.url;
      }
    }
  }, [currentChannel]);

  const parseM3U = (m3uText: string): Channel[] => {
    const lines = m3uText.split("\n");
    const channels: Channel[] = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("#EXTINF")) {
        const nameMatch = lines[i].match(/,(.+)/);
        const logoMatch = lines[i].match(/tvg-logo="([^"]+)"/);
        const url = lines[i + 1]?.trim();
        if (nameMatch && url) {
          channels.push({
            name: nameMatch[1],
            logo: logoMatch ? logoMatch[1] : "",
            url,
          });
        }
      }
    }
    return channels;
  };

  return (
    <div className="absolute left-50 top-30  flex flex-col items-center p-6 bg-gray-800 text-white rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Lista de Canales</h2>
      <div className="overflow-y-auto max-h-60 w-full">
        {channels.map((channel) => (
          <button
            key={channel.url}
            className="flex items-center gap-4 p-2 w-full hover:bg-gray-700 transition"
            onClick={() => setCurrentChannel(channel)}
          >
            {channel.logo && <img src={channel.logo} alt={channel.name} className="w-10 h-10 rounded" />}
            <span>{channel.name}</span>
            <BsPlayFill size={20} className="text-blue-500" />
          </button>
        ))}
      </div>

      {currentChannel && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{currentChannel.name}</h3>
          <video ref={videoRef} controls className="w-full mt-2" />
        </div>
      )}
    </div>
  );
};

export default IPTVPlayer;
