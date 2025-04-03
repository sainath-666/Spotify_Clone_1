import React from "react";
import {
  BsThreeDotsVertical,
  BsHeart,
  BsHeartFill,
  BsSearch,
} from "react-icons/bs";
import { Song } from "../data/songs";
import { IconType, IconBaseProps } from "react-icons";

const IconWrapper = ({ icon: Icon }: { icon: IconType }) => {
  const Component = Icon as React.ComponentType<IconBaseProps>;
  return <Component />;
};

interface SongListProps {
  songs: Song[];
  currentSong: Song;
  onSongSelect: (song: Song) => void;
  onToggleFavorite: (songId: string) => void;
  favorites: Set<string>;
  isPlaying: boolean;
  currentSection: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SongList: React.FC<SongListProps> = ({
  songs,
  currentSong,
  onSongSelect,
  onToggleFavorite,
  favorites,
  isPlaying,
  currentSection,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="songs-section">
      <h1 className="section-title">{currentSection}</h1>

      <div className="search-container">
        <div className="search-input-wrapper">
          <IconWrapper icon={BsSearch} />
          <input
            type="text"
            className="search-input"
            placeholder="Search Song, Artist"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="song-list">
        {songs.map((song) => (
          <div
            key={song.id}
            className={`song-item ${
              currentSong.id === song.id ? "active" : ""
            }`}
            onClick={() => onSongSelect(song)}
          >
            <div className="song-info">
              <div className="song-thumbnail">
                <img src={song.thumbnail} alt={song.title} />
                {currentSong.id === song.id && isPlaying && (
                  <div className="playing-indicator">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                  </div>
                )}
              </div>
              <div className="song-details">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
            </div>
            <span className="song-duration">{song.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;
