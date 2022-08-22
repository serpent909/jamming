import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }


    renderAction() {
        if (this.props.isRemoval === true) {
            return <button className="Track-action" onClick={this.removeTrack}>-</button>

        } else {
            return (
                <div>
                    {this.props.track.previewUrl? <button className="Track-play" onClick={this.props.onPlay} name={this.props.track.previewUrl}>▶️</button>:<button className="Track-play" title="No preview available" disabled>▶️</button>}
                    <audio id={this.props.track.previewUrl} name={this.props.track.id}>
                        <source src={this.props.track.previewUrl} type="audio/mpeg" />
                    </audio>
                    <button className="Track-action" onClick={this.addTrack} id={this.props.track.previewUrl}>+</button>
                </div>
            )
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }


    render() {
        return (
            <div className="Track" id={this.props.track.id}>
                <img className="album-image" src={this.props.track.albumImage} alt={this.props.track.previewUrl} />
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                    <p></p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}


export default Track;