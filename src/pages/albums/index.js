/**
 * Created by mohitbhansali on 11/06/18.
 */
import React, {Component} from "react";
import {Route} from "react-router-dom";
import co from 'co';
//import explicit from '../../assets/explicit.png';


class Albums extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        let that = this;
        co(function *() {
            yield that.albumsProvider.fetchAlbums();
        });
    }

    render() {
        return <div className="content-wrapper">
            {
                !this.props.albumsProvider.albums && window.location.pathname === '/' &&
                <div ref="searchLoading" className="loading-icon">
                    <span></span>
                </div>
            }
            {
                this.props.albumsProvider.albums &&
                <div id="searchResults">
                    <div className="result-bubble album">
                        <div className="result-bubble-header">
                            <h1>New Music</h1>
                            {/*<div className="controls">  <a href="#" className="view-less">View Less</a>
                             <a href="#" className="view-more">View More</a>
                             <div className="view-less-label">1 - 25 of 25</div>
                             <div className="view-more-label">1 - 5 of 25</div>
                             </div>*/}
                        </div>
                        <div className="result-bubble-container">
                            <div className="bubble-items">
                                { this.props.albumsProvider.albums.map((album, index)=>{
                                    let w = 118;
                                    let h = 118;
                                    let url = album.attributes.artwork.url;
                                    url = url.replace("{w}",w);
                                    url = url.replace("{h}",h);
                                    return <Route key={index} render={({history}) => {
                                        return <a href={`/albums/${album.id}`}>
                                            <div className="result">
                                                <div className="image album">
                                                    <img src={url} alt={album.attributes.name} width="118"
                                                         height="118"/>
                                                </div>
                                                <div className="title">
                                                    <div className="name"
                                                         style={{"WebkitBoxOrient": "vertical"}}>{album.attributes.name}</div>
                                                    {/*<img className="explicit-small" src={explicit} alt="Explicit" />*/}
                                                </div>
                                                <div className="artist-name"
                                                     style={{"WebkitBoxOrient": "vertical"}}> {album.attributes.artistName} </div>
                                            </div>
                                        </a>
                                    }}></Route>
                                })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            }
        </div>
    }
}

export default Albums;