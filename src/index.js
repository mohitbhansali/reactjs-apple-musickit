import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MusicProvider from './core/MusicProvider';
import registerServiceWorker from './registerServiceWorker';

let musicProvider = MusicProvider.sharedProvider();
musicProvider.configure();
let musicInstance = musicProvider.getMusicInstance();
console.log("Music Instance", musicInstance);

ReactDOM.render(<App musicInstance={musicInstance} />, document.getElementById('root'));
registerServiceWorker();
