import React, { useState, useRef, useEffect } from "react";
import "./styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { songs } from "./data/songs";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import { Song } from "./data/songs";
import useBackgroundColor from "./hooks/useBackgroundColor";

const App: React.FC = () => {
  // State management
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("for-you");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("favorites");
    return new Set(saved ? JSON.parse(saved) : []);
  });
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>(() => {
    const saved = sessionStorage.getItem("recentlyPlayed");
    return saved ? JSON.parse(saved) : [];
  });
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get background color based on current song
  const backgroundColor = useBackgroundColor(currentSong.thumbnail);

  // Handle favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  // Handle recently played
  useEffect(() => {
    sessionStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);


  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);

    // Update recently played
    const newRecentlyPlayed = [
      song,
      ...recentlyPlayed.filter((s) => s.id !== song.id),
    ].slice(0, 10);
    setRecentlyPlayed(newRecentlyPlayed);
  };

  const handleToggleFavorite = (songId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(songId)) {
      newFavorites.delete(songId);
    } else {
      newFavorites.add(songId);
    }
    setFavorites(newFavorites);
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    handleSongSelect(songs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    handleSongSelect(songs[previousIndex]);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      const time = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value);
    }
  };

  // Filter songs based on search and active tab
  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    switch (activeTab) {
      case "for-you":
      case "top-tracks":
        return true;
      case "favorites":
        return favorites.has(song.id);
      case "recently-played":
        return recentlyPlayed.some((s) => s.id === song.id);
      default:
        return true;
    }
  });

  return (
    <div
      className="app-container"
      style={{
        background: backgroundColor,
      }}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <SongList
        songs={filteredSongs}
        currentSong={currentSong}
        onSongSelect={handleSongSelect}
        onToggleFavorite={handleToggleFavorite}
        favorites={favorites}
        isPlaying={isPlaying}
        currentSection={
          activeTab === "favorites"
            ? "favorites"
            : activeTab === "recently-played"
            ? "Recently Played"
            : activeTab === "top-tracks"
            ? "Top Tracks"
            : "For You"
        }
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onVolumeChange={handleVolumeChange}
        volume={volume}
        progress={progress}
        onSeek={handleSeek}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={favorites.has(currentSong.id)}
      />

      <audio
        ref={audioRef}
        src={currentSong.musicUrl}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
};

export default App;
