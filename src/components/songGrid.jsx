import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SongGrid.css';

const SongGrid = ({ songs, onSelectSong }) => {
    const navigate = useNavigate();

    const handleSongClick = (song) => {
        onSelectSong(song);
        navigate('/visualizer');
    };

    return (
        <div className="song-grid">
            {songs.map((song, index) => (
                <div key={index} className="song-card" onClick={() => handleSongClick(song)}>
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                </div>
            ))}
        </div>
    );
};

export default SongGrid;
