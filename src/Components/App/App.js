import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';


class App extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      searchResults: [],
      playlistName: 'My playlist',
      playlistTracks: [],
      playing: ''
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.play = this.play.bind(this);
    // this.accessToken = Spotify.getAccessToken();
    this.searchState = window.location.href.match(/state=([^&]*)/);
    if (this.searchState && this.searchState.length && this.searchState.length > 1) {
      this.search(this.searchState[1]);

    }
  }

  addTrack(track) {

    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {

    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    })
    if (this.searchState) {
      window.history.pushState('Access Token', null, `/?state=${term}`)

    }
  }

  play(playButton) {

    let audioArray = document.querySelectorAll('audio');
    audioArray.forEach(audio => {
      audio.pause();
    })

    let buttonArray = document.querySelectorAll('.Track-play');
    buttonArray.forEach(button => {
      button.innerHTML = '▶️';
    })

    let imageArray = document.querySelectorAll('.album-image');
    imageArray.forEach(image => { image.classList.remove('rotate') })

    let targetElementName = playButton.target.name

    if (targetElementName === this.state.playing) {
      let htmlElement = document.getElementById(targetElementName);
      htmlElement.pause();
      htmlElement.currentTime = 0;
      this.setState({ playing: [] })
      this.stopRotate(htmlElement);

    } else {
      let button = playButton.target
      button.innerHTML = '⏹️'
      let htmlElement = document.getElementById(targetElementName);
      htmlElement.play()
      this.setState({ playing: targetElementName });
      this.rotate(htmlElement)
    }
  }

  rotate(audioId) {
    let audioString = audioId.id.toString();
    let trackImage = document.querySelector(`img[alt="${audioString}"]`);
    trackImage.classList.add('rotate');
  }

  stopRotate(audioId) {
    let audioString = audioId.id.toString();
    let trackImage = document.querySelector(`img[alt="${audioString}"]`);
    trackImage.classList.remove('rotate');
  }


  render() {

    return (

      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onPlay={this.play} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}

            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
