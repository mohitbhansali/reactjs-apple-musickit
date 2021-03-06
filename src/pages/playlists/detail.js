/**
 * Created by mohitbhansali on 11/06/18.
 */
import React, {Component} from "react";
import co from 'co';
import Player from './player';

class PlaylistDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.fetchPlaylistDetails();
    }

    fetchPlaylistDetails() {
        this.props.playlistsProvider.onLoad(()=>{
            this.setState({});
        });
        let that = this;
        co(function*() {
            yield that.props.playlistsProvider.fetchPlaylistDetails(that.props.detailProp.match.params[0]);
        });
    }

    render() {
        return <div className="details">
            <div className="intro intro-details">
                <a className="details-back" href="/albums"><span className="appleicons">&#60;</span> Search</a>
            </div>
            {
                !this.props.playlistsProvider.playlistDetails &&
                <div id="searchLoading" className="loading-icon">
                    <span></span>
                </div>
            }
            {
                this.props.playlistsProvider.playlistDetails &&
                    <div id="detailWrapper" className="album">
                        <div id="primary"></div>
                        <div id="secondary">{this.props.playlistsProvider.playlistDetails.attributes.name}, {this.props.playlistsProvider.playlistDetails.attributes.artistName}</div>
                        <div id="details" className="sf-pro-display-regular">
                            <div className="genre">Hip-Hop/Rap</div> • <div className="release">2018</div>
                        </div>

                        <div id="embed">
                            <div id="player">
                                <Player playlistsProvider={this.props.playlistsProvider} />
                            </div>
                        </div>
                    </div>
            }
        </div>
    }
}

export default PlaylistDetail;