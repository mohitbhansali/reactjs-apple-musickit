/**
 * Created by mohitbhansali on 11/06/18.
 */
import React, {Component} from "react";
import {Route} from "react-router-dom";
import explicit from '../../assets/explicit.png';


class Albums extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div className="content-wrapper">
            {/*<div id="searchResults">
             {
             this.state.genres.map((genre, index)=>{
             console.log(genre);
             return <div key={index} className="result-bubble album">
             <div className="result-bubble-header">
             <h1>{genre.attributes.name}</h1>
             <div className="controls">  <a href="#" className="view-less">View Less</a>
             <a href="#" className="view-more">View More</a>
             <div className="view-less-label">1 - 25 of 25</div>
             <div className="view-more-label">1 - 5 of 25</div>
             </div>
             </div>
             <div className="result-bubble-container">
             <div className="bubble-items">
             <a href="/en-us/details/1396710872?country=in&amp;media=all&amp;type=album">

             <div className="result">
             <div className="image album">
             <img src="https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/29/88/ea/2988ea5e-7f83-3d88-239f-540ce3c40309/00602567803881.rgb.jpg/236x236bb.jpeg" alt="236x236bb" width="118" height="118" />
             </div>
             <div className="title">
             <div className="name">KIDS SEE GHOSTS</div>
             <img className="explicit-small" src={explicit} />
             </div>
             <div className="artist-name"> KIDS SEE GHOSTS, Kanye West &amp; Kid Cudi </div>
             </div>
             </a>
             </div>
             </div>
             </div>
             })
             }
             </div>*/}
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
                            { this.props.albumsProvider.albums &&
                                this.props.albumsProvider.albums.map((album, index)=>{
                                    let w = 118;
                                    let h = 118;
                                    let url = album.attributes.artwork.url;
                                    url = url.replace("{w}",w);
                                    url = url.replace("{h}",h);
                                    return <Route path="/albums/:id" key={index} render={({history}) => {
                                        return <a href={`/albums/${album.id}`}>
                                            <div className="result">
                                                <div className="image album">
                                                    <img src={url} alt={album.attributes.name} width="118"
                                                         height="118"/>
                                                </div>
                                                <div className="title">
                                                    <div className="name"
                                                         style={{"WebkitBoxOrient": "vertical"}}>{album.attributes.name}</div>
                                                    <img className="explicit-small" src={explicit}/>
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
        </div>
    }
}

export default Albums;