import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SongGrid from './components/SongGrid';
import Visualizer from './components/Visualizer';
import './App.css';

const songs = [
  { title: 'Song 1', artist: 'Artist 1', file: '/chillhappybeat.mp3' },
  { title: 'Song 2', artist: 'Artist 2', file: '/rnbsample.mp3' },
];

function App() {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SongGrid songs={songs} onSelectSong={setSelectedSong} />} />
        <Route path="/visualizer" element={<Visualizer song={selectedSong} />} />
      </Routes>
    </div>
  );
}

export default App;
