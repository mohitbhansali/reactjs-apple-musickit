/**
 * Created by mohitbhansali on 11/06/18.
 */
import React, {Component} from "react";
import '../../css/Player.css';

class Player extends Component {
    constructor(props) {
        super(props);
        this.albumProvider = this.props.albumsProvider;
        this.musicInstance = this.albumProvider.musicInstance;
        console.log("Props",this.musicInstance);
    }

    action(action,track) {
        console.log(track.attributes.trackNumber);
        this.musicInstance.setQueue({ album: this.albumProvider.albumDetails.id }).then((queue) => {
            console.log("queue in inititated", queue);
            queue.position = track.attributes.trackNumber;
            switch (action) {
                case "play":
                    if(this.musicInstance.player.isPlaying) {
                        this.musicInstance.stop();
                    }
                    this.musicInstance.play();
                    break;
                case "pause":
                    this.musicInstance.pause();
                    break;
                case "stop":
                    this.musicInstance.stop();
                    break;
                case "next":
                    this.musicInstance.playNext();
                    break;
                case "previous":
                    this.musicInstance.playLater();
                    break;
                default:
                    break;
            }
        });
    }

    render() {
        let artworkUrl = this.albumProvider.albumDetails.attributes.artwork.url;
        artworkUrl = artworkUrl.replace("{w}",500);
        artworkUrl = artworkUrl.replace("{h}",500);
        return <div id="app"><div className="embed-player">
            <div className="song resting">
                <div className="song__heading">
                    <button className="song__heading__logo">
                        <span className="logo"></span>
                    </button>
                    {
                        !this.musicInstance.isAuthorized &&
                        <button className="song__heading__auth">
                            Sign In
                        </button>
                    }
                </div>

                <div className="song__body">
                    <div className="song__artwork">
                        <div className="artwork-container">
                            <img className="artwork" src={artworkUrl} alt="artwork" style={{background:"#fbad7c"}} />
                            <img className="artwork shadow" src={artworkUrl} alt="artwork shadow" />
                        </div>
                        <div className="song__count">
                            7 Songs
                        </div>
                    </div>
                    <div className="song__lcd">
                        <div className="song__info">
                            <div className="song__info__name name-container">
                                <span className="name">{this.albumProvider.albumDetails.attributes.name}</span>
                                <span className="badge explicit"></span>
                            </div>
                            <div className="song__info__sub" title="KIDS SEE GHOSTS, Kanye West &amp; Kid Cudi">
                                <span>{this.albumProvider.albumDetails.attributes.artistName}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="error-modal hide">
                <div className="error-modal__overlay"></div>
                <button className="error-modal__close"></button>
                <div className="error-modal__bg">
                    <div className="error-modal__content">
                        <p className="error-modal__message"></p>
                    </div>
                </div>
            </div>

            <div className="scrollhint top">
                <div className="gradient" style={{display: "none"}}></div>
            </div>

            <div className="tracklist ">

                <div className="tracklist__border"></div>
                <ul className="tracklist__tracks">
                    {
                        this.albumProvider.albumDetails.relationships &&
                        this.albumProvider.albumDetails.relationships.tracks.data.map((track, index)=>{
                            console.log(track);
                            return <li key={index} className="tracklist__track" onClick={this.action.bind(this, 'play', track)}>
                                <span className="tracklist__track__num">
                                    {++index}
                                </span>
                                <span className="tracklist__track__info">
                                    <span className="tracklist__track__name name-container">
                                    <span className="name">
                                        {track.attributes.name}
                                    </span>
                                    <span className="badge explicit"></span>
                                  </span>
                                </span>
                            </li>
                        })
                    }
                </ul>

                <div className="tracklist__upsell">
                    <div className="tracklist__upsell__logo"></div>
                </div>

            </div>

        </div>
        </div>
    }
}
export default Player;