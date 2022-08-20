import React from 'react';
import './Track.css';

class Track extends React.Component {

    renderAction() {
        if (this.props.isRemoval === true) {
            return <button className="Track-action">-</button>
        } else {
            return <button className="Track-action">+</button>
        }
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3></h3>
                    <p></p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;