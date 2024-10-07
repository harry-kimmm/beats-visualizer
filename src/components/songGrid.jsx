import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SongGrid.css';
import ScrollAnimation from 'react-animate-on-scroll';

const SongGrid = ({ songs, onSelectSong }) => {
    const navigate = useNavigate();

    const handleSongClick = (song) => {
        onSelectSong(song);
        navigate('/visualizer');
    };

    return (

        <div>

            <h1>here is a collection of my beats.</h1>
            <h2>click on an item to see the beat visualized</h2>
            <div className="song-grid">
                {songs.map((song, index) => (
                    <div key={index} className="song-card" onClick={() => handleSongClick(song)}>
                        <h3>{song.title}</h3>
                        <p>{song.artist}</p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default SongGrid;
