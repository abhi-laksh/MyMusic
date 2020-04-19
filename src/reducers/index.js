import { combineReducers } from 'redux';
import { libraryReducer, playerReducer } from './player';
import { playlistReducer } from './playlists';
import { favouritesReducer } from './favourites';
import { queueReducer } from './queue';

module.exports = combineReducers({
    library: libraryReducer,
    player: playerReducer,
    favourites: favouritesReducer,
    playlists: playlistReducer,
    queue: queueReducer,
});