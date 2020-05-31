import { combineReducers } from 'redux';
import { playerReducer } from './player';
import { libraryReducer } from './library';

import { tracksReducer } from './tracks';
import { lyricsReducer } from './lyrics';
import { playlistReducer } from './playlists';

module.exports = combineReducers({
    library: libraryReducer,
    player: playerReducer,
    tracks: tracksReducer,
    lyrics: lyricsReducer,
    playlists: playlistReducer,
}); 