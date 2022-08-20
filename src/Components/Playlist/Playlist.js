import React from 'react';
import './Playlist.css';

class PlayList extends React.Component {
    render() {
        return (
            <div className="Playlist">
                <input Defaultvalue={"New Playlist"} />
                {/* <Tracklist /> */}
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default PlayList;