import React, { useState } from "react";
import {
  BsPlayFill,
  BsPauseFill,
  BsSkipStartFill,
  BsSkipEndFill,
  BsVolumeUp,
  BsVolumeMute,
  BsThreeDots,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import { Song } from "../types/song";
import { IconType, IconBaseProps } from "react-icons";

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onVolumeChange: (value: number) => void;
  volume: number;
  progress: number;
  onSeek: (value: number) => void;
  onToggleFavorite: (songId: string) => void;
  isFavorite: boolean;
}

const IconWrapper = ({ icon: Icon }: { icon: IconType }) => {
  const Component = Icon as React.ComponentType<IconBaseProps>;
  return <Component />;
};

const Player: React.FC<PlayerProps> = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  onVolumeChange,
  volume,
  progress,
  onSeek,
  onToggleFavorite,
  isFavorite,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleVolumeClick = () => {
    onVolumeChange(volume === 0 ? 100 : 0);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentSong) {
      onToggleFavorite(currentSong.id);
    }
    setShowMenu(false);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setShowMenu(false);
    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  if (!currentSong) return null;

  return (
    <div className="player-section">
      <div className="current-song-info">
        <h2>{currentSong.title}</h2>
        <p>{currentSong.artist}</p>
        <div className="album-art">
          <img src={currentSong.thumbnail} alt={currentSong.title} />
        </div>
      </div>

      <div className="player-controls">
        <div className="progress-container">
          <input
            type="range"
            className="progress-bar"
            value={progress}
            onChange={(e) => onSeek(Number(e.target.value))}
            min="0"
            max="100"
            step="0.1"
            title="Song progress"
            aria-label="Song progress"
          />
        </div>

        <div className="control-buttons-container">
          <div className="menu-container">
            <button
              className="menu-button"
              onClick={handleMenuClick}
              title="More options"
              aria-label="More options"
            >
              <IconWrapper icon={BsThreeDots} />
            </button>
            {showMenu && (
              <div className="menu-dropdown">
                <button className="menu-item" onClick={handleFavoriteClick}>
                  <IconWrapper icon={isFavorite ? BsHeartFill : BsHeart} />
                  <span>
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </span>
                </button>
              </div>
            )}
          </div>

          <div className="control-buttons">
            <button
              className="control-button"
              onClick={onPrevious}
              title="Previous song"
              aria-label="Previous song"
            >
              <IconWrapper icon={BsSkipStartFill} />
            </button>
            <button
              className="control-button play"
              onClick={onPlayPause}
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <IconWrapper icon={isPlaying ? BsPauseFill : BsPlayFill} />
            </button>
            <button
              className="control-button"
              onClick={onNext}
              title="Next song"
              aria-label="Next song"
            >
              <IconWrapper icon={BsSkipEndFill} />
            </button>
          </div>

          <button
            className="volume-button"
            onClick={handleVolumeClick}
            title={volume === 0 ? "Unmute" : "Mute"}
            aria-label={volume === 0 ? "Unmute" : "Mute"}
          >
            <IconWrapper icon={volume === 0 ? BsVolumeMute : BsVolumeUp} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
