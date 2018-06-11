/**
 * Created by mohitbhansali on 11/06/18.
 */
import React, {Component} from "react";
import co from 'co';
import Player from './player';

class AlbumDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.fetchAlbumDetails();
    }

    fetchAlbumDetails() {
        this.props.albumsProvider.onLoad(()=>{
            this.setState({});
        });
        let that = this;
        co(function*() {
            yield that.props.albumsProvider.fetchAlbumDetails(that.props.detailProp.match.params[0]);
        });
    }

    render() {
        return <div className="details">
            <div className="intro intro-details">
                <a className="details-back" href="/albums"><span className="appleicons">&#60;</span> Search</a>
            </div>
            {
                this.props.albumsProvider.albumDetails &&
                    <div id="detailWrapper" className="album">
                        <div id="primary"></div>
                        <div id="secondary">{this.props.albumsProvider.albumDetails.attributes.name}, {this.props.albumsProvider.albumDetails.attributes.artistName}</div>
                        <div id="details" className="sf-pro-display-regular">
                            <div className="genre">Hip-Hop/Rap</div> • <div className="release">2018</div>
                        </div>

                        <div id="embed">
                            <div id="searchLoading" className="loading-icon" style={{display: "none"}}>
                                <span></span>
                            </div>
                            <div id="player" style={{height: "450px", width: "660px"}}>
                                <Player albumsProvider={this.props.albumsProvider} />
                            </div>
                        </div>
                    </div>
            }
        </div>
    }
}

export default AlbumDetail;