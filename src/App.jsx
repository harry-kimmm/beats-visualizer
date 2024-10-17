import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SongGrid from './components/SongGrid';
import Visualizer from './components/Visualizer';
import './App.css';

const songs = [
  { title: 'Beat 1', artist: 'Harry Kim', file: '/chillhappybeat.wav' },
  { title: 'Beat 2', artist: 'Harry Kim', file: '/rnbsample.mp3' },
  { title: 'Beat 3', artist: 'Harry Kim', file: '/wavy.wav' },
  { title: 'Beat 4', artist: 'Harry Kim', file: '/<()>.wav' },
  { title: 'Beat 5', artist: 'Harry Kim', file: '/coolscalerstuff.wav' },
  { title: 'Beat 6', artist: 'Harry Kim', file: '/soundscowboy.wav' },
  { title: 'Beat 7', artist: 'Harry Kim', file: '/sad.wav' },
  { title: 'Beat 8', artist: 'Harry Kim', file: '/guitars.wav' },

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
