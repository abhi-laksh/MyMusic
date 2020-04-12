import { combineReducers } from 'redux';
import { libraryReducer, playerReducer } from './player';

module.exports = combineReducers({
    library: libraryReducer,
    player: playerReducer
})
