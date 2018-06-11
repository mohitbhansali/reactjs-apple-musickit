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

    action(action) {
        console.log(action);
        console.log("Details",this.albumProvider.albumDetails);
        console.log(this.musicInstance.setQueue);
        this.musicInstance.setQueue({ album: this.albumProvider.albumDetails.id, startPosition: this.albumProvider.albumDetails.attributes.trackCount }).then((queue) => {
            console.log("queue in inititated", queue);
            switch (action) {
                case "play":
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
                    <button className="song__heading__auth">
                        Sign In
                    </button>
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

            <div className="logout-modal hide ">
                <div className="logout-modal__overlay"></div>
                <button className="logout-modal__close"></button>
                <div className="logout-modal__bg">
                    <div className="logout-modal__content">
                        <div className="logout-modal__icon"></div>
                        <div className="logout-modal__container">
                            <p className="logout-modal__message">You are signed in to Apple&nbsp;Music.</p>
                            <button className="logout-modal__button">Sign Out</button>
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
                            return <li key={index} className="tracklist__track" onClick={this.action.bind(this, 'play')}>
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

                <div className="tracklist__footer">
                    <div className="tracklist__footer__duration">
                        7 Songs,

                        23 Minutes
                    </div>
                    <div className="tracklist__footer__release">
                        Released: June 8, 2018
                    </div>
                    <div className="tracklist__footer__copyright">
                        ℗ 2018 Getting Out Our Dreams II, LLC Distributed By Def Jam,  A Division of UMG Recordings, Inc.
                    </div>
                </div>

                <div className="tracklist__upsell">
                    <div className="tracklist__upsell__logo"></div>
                    <div className="tracklist__upsell__copy">
                        Play and download all the music you want.
                    </div>
                    <div className="tracklist__upsell__buttons">
                        <button className="cta">
                            Get Apple&nbsp;Music
                        </button>
                        <button className="login">
                            Sign In
                        </button>
                    </div>
                </div>

            </div>

            <div className="scrollhint bottom">
                <div className="gradient"></div>
            </div>

            <div className="tracklist-modal tracklist-modal--share hide">
                <div className="tracklist-modal__overlay"></div>
                <button className="tracklist-modal__close"></button>
                <div className="tracklist-modal__bg">
                    <div className="tracklist-modal__content">
                        <input id="copy-to-clipboard" readOnly="" type="text" />
                            <button className="button link-album">
                            <div className="text">
                                Copy Link to Album
                            </div>
                            <div className="icon"></div>
                        </button>
                            <button className="button embed-playlist">
                            <div className="text">
                                Embed Album
                            </div>
                            <div className="icon"></div>
                        </button>
                            <button className="button open-popup">
                                <div className="text">Open in New Window</div>
                                <div className="icon"></div>
                            </button>
                    </div>
                </div>

                <a className="tracklist-modal__legal" href="https://support.apple.com/kb/HT208364">See how your data is managed</a>
            </div>

            <div className="tracklist-modal tracklist-modal--upsell hide">
                <div className="tracklist-modal__overlay"></div>
                <button className="tracklist-modal__close"></button>
                <div className="tracklist-modal__bg">
                    <div className="tracklist-modal__content">
                        <div className="tracklist-modal__logo"></div>
                        <div className="tracklist-modal__copy">Play and download all the music you want.</div>
                        <div className="tracklist-modal__buttons">
                            <button className="cta">Get Apple&nbsp;Music</button>
                            <button className="login">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="toast hide " role="alert">
                <div className="wrapper">
                    <div className="icon "></div>
                    <div className="text"></div>
                </div>
            </div>


        </div>
        </div>
    }
}
export default Player;