/**
 * Created by mohitbhansali on 11/06/18.
 */
import React, {Component} from "react";
import '../../css/Player.css';
import co from 'co';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {isPlaying: false, count: 0, timeRemaining: 0, queueInitiated: false};
        this.playlistsProvider = this.props.playlistsProvider;
        this.musicInstance = this.playlistsProvider.musicInstance;
        //console.log("Props",this.musicInstance);
    }

    componentWillUnmount () {
        clearInterval(this.timer)
    }
    tick () {
        var el = this.refs.inputRangeRef;
        this.setState({
            count: (this.musicInstance.player.currentPlaybackProgress * 100),
            timeRemaining: this.musicInstance.player.currentPlaybackTimeRemaining,
            nowPlayingItem: this.musicInstance.player.nowPlayingItem
        });
        el.value = this.musicInstance.player.currentPlaybackProgress;
    }
    startTimer () {
        clearInterval(this.timer);
        this.timer = setInterval(this.tick.bind(this), 1000)
    }
    stopTimer () {
        clearInterval(this.timer)
    }

    showTimeRemaining() {
        let s = this.state.timeRemaining;
        return (s-(s%=60))/60+(9<s?':':':0')+s;
    }

    setQueue(index) {
        if(this.state.queueInitiated) {
            if(index) {
                this.queue.position = index;
            }
            this.action('play');
        } else {
            let that = this;
            co(function*() {
                that.queue = yield that.musicInstance.setQueue({ playlist: that.playlistsProvider.playlistDetails.id });
                that.setState({queueInitiated: true});
                if(index) {
                    this.queue.position = index;
                }
                that.action('play');
            });
        }
    }

    action(action) {
        if(this.state.queueInitiated) {
            switch (action) {
                case "play":
                    if(this.musicInstance.player.isPlaying) {
                        this.musicInstance.stop();
                    }
                    this.musicInstance.play();
                    this.startTimer();
                    this.setState({
                        isPlaying: true,
                        timeRemaining: this.musicInstance.player.currentPlaybackTimeRemaining
                    });
                    break;
                case "pause":
                    this.musicInstance.pause();
                    this.stopTimer();
                    this.setState({isPlaying: false});
                    break;
                case "stop":
                    this.musicInstance.stop();
                    this.stopTimer();
                    this.setState({isPlaying: false});
                    break;
                case "next":
                    this.queue.position = this.musicInstance.player.nowPlayingItemIndex+1;
                    if(this.musicInstance.player.isPlaying) {
                        this.musicInstance.stop();
                    }
                    this.musicInstance.play();
                    this.startTimer();
                    this.setState({isPlaying: true, timeRemaining: this.musicInstance.player.currentPlaybackTimeRemaining});
                    break;
                case "previous":
                    this.musicInstance.playLater();
                    this.setState({count: 0});
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        let artworkUrl = this.playlistsProvider.playlistDetails.attributes.artwork.url;
        artworkUrl = artworkUrl.replace("{w}",500);
        artworkUrl = artworkUrl.replace("{h}",500);
        return <div className="embed-player">
            <div className={"song " + (this.state.isPlaying && this.musicInstance.player.currentBufferedProgress > 0 ?'in-progress playing':'')}>
                <div className="song__heading">

                </div>

                <div className="song__body">
                    <div className="song__artwork">
                        <div className="artwork-container">
                            <img className="artwork" src={artworkUrl} alt="artwork" style={{background:"#fbad7c"}} />
                            <img className="artwork shadow" src={artworkUrl} alt="artwork shadow" />
                        </div>
                        <div className="song__count">
                            {this.playlistsProvider.playlistDetails.relationships.tracks.data.length} Songs
                        </div>
                    </div>
                    <div className="song__lcd">
                        <div className="song__info">
                            <div className="song__info__name name-container">
                                <span className="name">{this.state.nowPlayingItem?this.state.nowPlayingItem.attributes.name:this.playlistsProvider.playlistDetails.attributes.name}</span>
                            </div>
                            <div className="song__info__sub" title={this.playlistsProvider.playlistDetails.attributes.artistName}>
                                <span>{this.state.nowPlayingItem?this.state.nowPlayingItem.albumInfo:this.playlistsProvider.playlistDetails.attributes.artistName}</span>
                            </div>
                        </div>

                        <div className="song__controls">
                            <div className="song__transport">
                                <div className="song__transport__control">
                                    {
                                        !this.state.isPlaying &&
                                        <button className="play" onClick={this.setQueue.bind(this, undefined)}>
                                            <span className="icon"></span>
                                        </button>
                                    }
                                    {
                                        this.state.isPlaying &&
                                        <button className="pause" onClick={this.action.bind(this, 'pause')}>
                                            <span className="icon"></span>
                                        </button>
                                    }
                                    <button className="skip" onClick={this.action.bind(this, 'next')}>
                                        <span className="icon"></span>
                                    </button>
                                </div>

                                <div className="song__transport__scrub">
                                    <div className="progress-bar">
                                        <input className="progress-bar__bg" step="any" min="0" max="1" defaultValue="0" type="range" ref="inputRangeRef" onChange={this.startTimer.bind(this)} />
                                        <div className="progress-bar__fg" style={{width:`${this.state.count}%`}}></div>
                                    </div>

                                    <span className="time">
                                        -{this.showTimeRemaining()}
                                    </span>
                                </div>
                            </div>
                        </div>
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
                        this.playlistsProvider.playlistDetails.relationships &&
                        this.playlistsProvider.playlistDetails.relationships.tracks.data.map((track, index)=>{
                            //console.log(track);
                            return <li key={index} className="tracklist__track" onClick={this.setQueue.bind(this, index)}>
                                {
                                    this.musicInstance.player.nowPlayingItemIndex === index &&
                                    <div className={"bars " + (this.state.isPlaying && this.musicInstance.player.currentBufferedProgress > 0 ? 'dance' : 'no-dance')}>
                                        <div className="bar one"></div>
                                        <div className="bar two"></div>
                                        <div className="bar three"></div>
                                        <div className="bar four"></div>
                                    </div>
                                }
                                {
                                    this.musicInstance.player.nowPlayingItemIndex !== index &&
                                    <span className="tracklist__track__num">
                                        {++index}
                                    </span>
                                }
                                <span className="tracklist__track__info">
                                    <span className="tracklist__track__name name-container">
                                    <span className="name">
                                        {track.attributes.name}
                                    </span>
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
    }
}
export default Player;