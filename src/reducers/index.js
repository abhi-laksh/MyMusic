import { combineReducers } from 'redux';
import { libraryReducer, playerReducer, playerControlReducer } from './player';
import { playlistReducer } from './playlists';
import { favouritesReducer } from './favourites';
import { queueReducer } from './queue';

module.exports = combineReducers({
    library: libraryReducer,
    player: playerReducer,
    controls:playerControlReducer,
    favourites: favouritesReducer,
    playlists: playlistReducer,
    queue: queueReducer,
});