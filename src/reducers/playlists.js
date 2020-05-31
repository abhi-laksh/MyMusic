import { combineReducers } from 'redux';
import {
    ADD_TRACKS_TO_PLAYLIST,
    REMOVE_TRACKS_FROM_PLAYLIST,
    RENAME_PLAYLIST,
    ADD_NEW_PLAYLIST,
    REMOVE_PLAYLIST,
} from '../actions/playlists';
import _ from 'lodash';
import { SYNC_TRACKS } from '../actions/tracks';
// *Playlist
/* 
     playlists:{
            byId:{
                "PL1":{
                    id:"1",
                    name:"",
                    tracks:["track-1","track-5"],
                },
                "PL2":{
                    id:"1",
                    name:"",
                    tracks:["track-1"],
                },
                "PL3":{
                    id:"1",
                    name:"",
                    tracks:["track-1"],
                },
            }
            allIds:[1,2,3]
        },
*/
function addTracksToPlaylist(state, action) {
    const { playlistId, trackId } = action;
    const playlist = state[playlistId];
    // new obj with all by ids,

    return {
        ...state,
        [playlistId]: {
            ...playlist,
            tracks: _.union(playlist.tracks, trackId),
        }
    }

}

function syncPlaylist(state, action) {
    const { syncedPlaylistsById } = action;
    return syncedPlaylistsById;
}

function removeTracksFromPlaylist(state, action) {
    const { playlistId, trackId } = action;
    const playlist = state[playlistId];
    // new obj with all by ids,
    return {
        ...state,
        [playlistId]: {
            ...playlist,
            tracks: playlist.tracks.slice(playlist.tracks.indexOf(trackId), 1),
        }
    }
}

function rename(state, action) {
    const { playlistId, name } = action;
    const playlist = state[playlistId];
    // new obj with all by ids,
    return {
        ...state,
        [playlistId]: {
            ...playlist,
            name: name,
        }
    }

}
function addNew(state, action) {
    const { playlistId, name, tracks, date } = action;
    const playlist = { id: playlistId, name: name, tracks: tracks, date: date };
    return {
        ...state,
        [playlistId]: playlist
    }
}

function remove(state, action) {
    const { ...newState } = state;
    const { playlistId } = action;
    delete newState[playlistId];
    return newState;
}

function playlistsById(state = {}, action) {
    switch (action.type) {
        case SYNC_TRACKS:
            return syncPlaylist(state, action);
        case ADD_TRACKS_TO_PLAYLIST:
            return addTracksToPlaylist(state, action);
        case REMOVE_TRACKS_FROM_PLAYLIST:
            return removeTracksFromPlaylist(state, action);
        case RENAME_PLAYLIST:
            return rename(state, action);
        case ADD_NEW_PLAYLIST:
            return addNew(state, action);
        case REMOVE_PLAYLIST:
            return remove(state, action);
        default:
            return state;
    }
}

function addPlaylistId(state, action) {
    const { playlistId } = action;
    // console.log("ADD PL :::::", state);

    return state.concat(playlistId);
}

function removePlaylistId(state, action) {
    const { playlistId } = action;
    const newState = state.concat();
    let index = newState.indexOf(playlistId);
    if (index > -1) {
        newState.splice(index, 1);
    }
    // console.log();
    // console.log("REMV PL:::", newState.indexOf(playlistId));
    // console.log(); 

    return newState;
}

function allPlaylists(state = [], action) {
    switch (action.type) {
        case ADD_NEW_PLAYLIST:
            return addPlaylistId(state, action);
        case REMOVE_PLAYLIST:
            return removePlaylistId(state, action);
        default:
            return state;
    }
}
export const playlistReducer = combineReducers({
    byId: playlistsById,
    allIds: allPlaylists,
});
