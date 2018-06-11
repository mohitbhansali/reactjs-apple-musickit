import React, { Component } from 'react';
import logo from './assets/apple-music-logo-black.svg';
import co from 'co';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Body from './page-components/body';
import './css/App.css';

class AlbumsProvider {
    constructor(musicInstance) {
        this.musicInstance = musicInstance;
    }
    *fetchAlbums() {
        this.albums = yield this.musicInstance.api.library.albums("",{});
        //console.log(this.albums);
        if(this.callbacks){
            this.callbacks.forEach((func)=>{
                func.call()
            });
        }
    }

    *fetchAlbumDetails(id) {
        this.albumDetails = yield this.musicInstance.api.library.album(id);
        //console.log(this.albumDetails);
        if(this.callbacks){
            this.callbacks.forEach((func)=>{
                func.call()
            });
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
        this.state = {genres:[], albums:[]};
        this.musicInstance = this.props.musicInstance;
        //this.loadGenres();
        this.setupAlbumsProvider(this.musicInstance);
    }
    loadGenres() {
        let that = this;
        co(function*() {
            let genres = yield that.instance.api.genres();
            that.setState({genres: genres})
        });
    }
    setupAlbumsProvider() {
        this.albumsProvider = new AlbumsProvider(this.musicInstance);
        this.albumsProvider.onLoad(()=>{
            this.setState({});
        });
        let that = this;
        co(function *() {
            yield that.albumsProvider.fetchAlbums();
        });
    }
    signIn() {
        this.instance.authorize();
    }
    signOut() {
        this.instance.unauthorize();
    }
    render() {
        return (
            <div className="App">
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                <img src={logo} alt="Apple music logo black" />
                            </a>
                        </div>
                        <div className="" id="">
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <a className="" href="#" onClick={this.signIn.bind(this)}>
                                        <span>Sign In</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="" href="#" onClick={this.signOut.bind(this)}>
                                        <span>Sign Out</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="ls-wrapper" id="toolboxWrapper">
                    <div className="container">
                        <div className="row intro">
                            <a className="" href="/en-us">
                                <h1 className="title">
                                    Now on
                                    Apple Music
                                </h1>
                                <p>
                                    Apple Music is home to millions of songs, albums, playlists and music videos. Go deeper into the world of music with Beats 1, original shows, concerts and more.
                                </p>
                            </a>
                        </div>
                        <Router>
                            <Body albumsProvider={this.albumsProvider} />
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
