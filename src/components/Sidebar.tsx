import React from "react";
import { Nav } from "react-bootstrap";
import { BsMusicNoteList, BsHeart, BsClock } from "react-icons/bs";
import { IconType, IconBaseProps } from "react-icons";

const IconWrapper = ({ icon: Icon }: { icon: IconType }) => {
  const Component = Icon as React.ComponentType<IconBaseProps>;
  return <Component />;
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <div className="sidebar-brand">
          <img
            src="/assets/images/spotify.png"
            alt="Spotify"
            className="brand-logo"
          />
          <span className="brand-name">Spotify</span>
        </div>

        <Nav className="flex-column sidebar-nav">
          <Nav.Link
            className={activeTab === "for-you" ? "active" : ""}
            onClick={() => onTabChange("for-you")}
          >
            <IconWrapper icon={BsMusicNoteList} />
            <span>For You</span>
          </Nav.Link>

          <Nav.Link
            className={activeTab === "top-tracks" ? "active" : ""}
            onClick={() => onTabChange("top-tracks")}
          >
            <IconWrapper icon={BsMusicNoteList} />
            <span>Top Tracks</span>
          </Nav.Link>

          <Nav.Link
            className={activeTab === "favourites" ? "active" : ""}
            onClick={() => onTabChange("favourites")}
          >
            <IconWrapper icon={BsHeart} />
            <span>Favourites</span>
          </Nav.Link>

          <Nav.Link
            className={activeTab === "recently-played" ? "active" : ""}
            onClick={() => onTabChange("recently-played")}
          >
            <IconWrapper icon={BsClock} />
            <span>Recently Played</span>
          </Nav.Link>
        </Nav>
      </div>

      <div className="sidebar-profile">
        <img
          src="/assets/images/img.jpg"
          alt="Profile"
          className="profile-image"
        />
      </div>

      <div className="sidebar-overlay" onClick={onClose} />
    </div>
  );
};

export default Sidebar;
