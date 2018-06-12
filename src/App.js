import React, { Component } from 'react';
import logo from './assets/apple-music-logo-black.svg';
import co from 'co';
import {BrowserRouter as Router} from "react-router-dom";
import Body from './page-components/body';
import './css/App.css';

class AlbumsProvider {
    constructor(musicInstance) {
        this.musicInstance = musicInstance;
    }
    *fetchAlbums() {
        if(this.musicInstance.api.library) {
            this.albums = yield this.musicInstance.api.library.albums();
            //console.log(this.albums);
            if(this.callbacks){
                this.callbacks.forEach((func)=>{
                    func.call()
                });
            }
        }
    }

    *fetchAlbumDetails(id) {
        if(this.musicInstance.api.library) {
            this.albumDetails = yield this.musicInstance.api.library.album(id);
            //console.log(this.albumDetails);
            if(this.callbacks){
                this.callbacks.forEach((func)=>{
                    func.call()
                });
            }
        }
    }

    onLoad(func) {
        if(!this.callbacks){
            this.callbacks = [];
        }
        this.callbacks.push(func);
    }
}

class PlaylistsProvider {
    constructor(musicInstance) {
        this.musicInstance = musicInstance;
    }

    *fetchPlaylists() {
        if(this.musicInstance.api.library) {
            this.playlists = yield this.musicInstance.api.library.playlists();
            if(this.callbacks){
                this.callbacks.forEach((func)=>{
                    func.call()
                });
            }
        }
    }

    *fetchPlaylistDetails(id) {
        if(this.musicInstance.api.library) {
            this.playlistDetails = yield this.musicInstance.api.library.playlist(id);
            if(this.callbacks){
                this.callbacks.forEach((func)=>{
                    func.call()
                });
            }
        }
    }

    onLoad(func) {
        if(!this.callbacks){
            this.callbacks = [];
        }
        this.callbacks.push(func);
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {isLogin: false, genres:[], albums:[]};
        this.musicInstance = this.props.musicInstance;
        //this.signIn();
        this.setupAlbumsProvider(this.musicInstance);
        this.setupPlaylistsProvider(this.musicInstance);
    }
    componentWillMount() {
        if(this.musicInstance.isAuthorized) {
            this.setState({isLogin: true});
        }
    }
    setupAlbumsProvider() {
        this.albumsProvider = new AlbumsProvider(this.musicInstance);
        this.albumsProvider.onLoad(()=>{
            this.setState({});
        });
    }
    setupPlaylistsProvider() {
        this.playlistsProvider = new PlaylistsProvider(this.musicInstance);
        this.playlistsProvider.onLoad(()=>{
            this.setState({});
        });
    }
    signIn() {
        let that = this;
        co(function*() {
            let key  = yield that.musicInstance.authorize();
            if(key) {
                that.setState({isLogin: true});
            }
        });
    }
    signOut() {
        let that = this;
        co(function*() {
            let status = yield that.musicInstance.unauthorize();
            console.log(status);
            that.setState({isLogin: false});
        });
    }
    render() {
        return (
            <div className="App">
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">
                                <img src={logo} alt="Apple music logo black" />
                            </a>
                        </div>
                        <div className="" id="">
                            <ul className="nav navbar-nav navbar-right">
                                {
                                    !this.state.isLogin &&
                                    <li>
                                        <a onClick={this.signIn.bind(this)}>
                                            <span>Sign In</span>
                                        </a>
                                    </li>
                                }
                                {
                                    this.state.isLogin &&
                                    <li>
                                        <a onClick={this.signOut.bind(this)}>
                                            <span>Sign Out</span>
                                        </a>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="ls-wrapper" id="toolboxWrapper">
                    <div className="container">
                        <div className="row intro">
                            <h1 className="title">
                                Now on
                                Apple Music
                            </h1>
                            <p>
                                Apple Music is home to millions of songs, albums, playlists and music videos. Go deeper into the world of music with Beats 1, original shows, concerts and more.
                            </p>
                        </div>
                        <Router>
                            <Body isLogin={this.state.isLogin}
                                  albumsProvider={this.albumsProvider}
                                  playlistsProvider={this.playlistsProvider}
                            />
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
