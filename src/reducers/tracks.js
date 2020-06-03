import {
    ADD_TRACK,
    DELETE_TRACKS,
    MODIFY_TRACKS,
    SYNC_TRACKS,
    ADD_TRACKS_IN_BULK
} from '../actions/tracks';

import { combineReducers } from 'redux';
import { ADD_LYRICS, REMOVE_LYRICS } from '../actions/lyrics';

/* 
        tracks:{
            byId:{
                "track-1":{
                    id:"Track-1",
                    title:"Song Name",
                    album:"",
                    artist:"",
                    dirPath:"",
                    mtime:"",
                    size:"",
                    url:"",
                    lyricsId:"lrc-1",
                }
            }
            allIds:["track-1"]
        },
*/

function addTrack(state, action) {
    const {
        trackId,
        title,
        url,
        size,
        mtime,
        dirPath,
        album,
        artist,
        duration,
        lyricsId = null,
    } = action;

    const track = {
        id: trackId,
        title,
        url,
        size,
        mtime,
        dirPath,
        album,
        artist,
        duration,
        lyricsId,
    }
    return {
        ...state,
        [trackId]: track
    }
}
function addTracksInBulk(state, action) {
    const { newTracksById } = action;
    return {
        ...state,
        ...newTracksById
    }
}

function syncTracks(state, action) {
    const { syncedTracksById } = action;
    return {
        ...state,
        ...syncedTracksById
    }
}


function deleteTracks(state, action) {
    const { ...newState } = state;
    const { trackId } = action;
    delete newState[trackId];
    return newState;
}

function modifyMetadata(state, action) {
    const {
        trackId,
        newTrackInfo
    } = action;

    const track = state[trackId];

    const { title, album, artist } = newTrackInfo;

    return {
        ...state,
        [trackId]: {
            ...track,
            title,
            album,
            artist,
        }
    };
}

function addLyricsToTrack(state, action) {
    const {
        trackId,
        lyricsId,
    } = action;

    const track = state[trackId];

    return {
        ...state,
        [trackId]: {
            ...track,
            lyricsId: lyricsId,
        }
    };
}

function removeLyricsFromTrack(state, action) {
    const {
        trackId,
    } = action;

    const track = state[trackId];

    return {
        ...state,
        [trackId]: {
            ...track,
            lyricsId: null,
        }
    };
}

export function tracksById(state = {}, action) {
    switch (action.type) {
        case SYNC_TRACKS:
            return syncTracks(state, action);
        case ADD_TRACKS_IN_BULK:
            return addTracksInBulk(state, action);
        case ADD_TRACK:
            return addTrack(state, action);
        case DELETE_TRACKS:
            return deleteTracks(state, action);
        case MODIFY_TRACKS:
            return modifyMetadata(state, action);
        case ADD_LYRICS:
            return addLyricsToTrack(state, action);
        case REMOVE_LYRICS:
            return removeLyricsFromTrack(state, action);
        default:
            return state;
    }
}

function addTracksId(state, action) {
    const { trackId } = action;
    return state.concat(trackId);
}

function addTracksIdInBulk(state, action) {
    const { newAllTrackIds } = action;
    return state.concat(newAllTrackIds);
}

function syncTrackIds(state, action) {
    const { syncedTracksAllIds } = action;
    return syncedTracksAllIds;
}

function removeTracksId(state, action) {
    const { trackId } = action;
    const newState = state.concat();
    newState.slice(newState.indexOf(trackId), 1)
    return newState;
}

export function allTracks(state = [], action) {
    switch (action.type) {
        case ADD_TRACK:
            return addTracksId(state, action)
        case ADD_TRACKS_IN_BULK:
            return addTracksIdInBulk(state, action);
        case SYNC_TRACKS:
            return syncTrackIds(state, action);
        case DELETE_TRACKS:
            return removeTracksId(state, action)
        default:
            return state;
    }
}

export const tracksReducer = combineReducers({
    byId: tracksById,
    allIds: allTracks,
});
