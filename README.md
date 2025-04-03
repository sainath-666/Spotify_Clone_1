# Music Player UI

A modern, responsive music player interface built with React, TypeScript, and SCSS.

## Features

- 🎵 Music playback controls with progress bar
- 🎨 Dynamic background colors based on album art
- 💾 Local storage for favorites
- 📝 Session storage for recently played tracks
- 🔍 Search functionality for songs and artists
- 📱 Responsive design for mobile and desktop
- ❤️ Favorite tracks management
- 🎯 Recently played tracks tracking
- 🎨 Smooth animations and transitions

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sainath-666/spotify_clone
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/         # React components
│   ├── Player.tsx     # Music player controls
│   ├── Sidebar.tsx    # Navigation sidebar
│   └── SongList.tsx   # Song list display
├── data/              # Static data
│   └── songs.ts       # Song data
├── hooks/             # Custom React hooks
│   └── useBackgroundColor.ts
├── styles/            # SCSS styles
│   └── main.scss      # Main stylesheet
└── App.tsx           # Main application component
```

## Technologies Used

- React
- TypeScript
- SCSS
- React Bootstrap
- React Icons

## Features Implementation

### Dynamic Background

The background color changes based on the dominant color of the current song's album art. This is implemented using the `useBackgroundColor` hook, which analyzes the image and creates a gradient.

### Storage

- Favorites are stored in localStorage and persist across browser sessions
- Recently played tracks are stored in sessionStorage and are cleared when the browser is closed
- The application maintains state using React's useState and useEffect hooks

### Responsive Design

The interface adapts to different screen sizes:

- Desktop: Full sidebar with song list
- Mobile: Collapsible sidebar with focus on the player

### Animations

- Smooth transitions for background color changes
- Loading animations for song lists
- Interactive hover effects
- Playing indicator animations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
