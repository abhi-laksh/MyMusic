import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

export const ADD_TRACKS_TO_PLAYLIST = 'ADD_TRACKS_TO_PLAYLIST';
export const REMOVE_TRACKS_FROM_PLAYLIST = 'REMOVE_TRACKS_FROM_PLAYLIST';
export const RENAME_PLAYLIST = 'RENAME_PLAYLIST';
export const ADD_NEW_PLAYLIST = 'ADD_NEW_PLAYLIST';
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';
export const ALL_PLAYLIST = 'ALL_PLAYLIST';

// P. L. STRUC : { name:"Foo" , tracks: [{},{},...] }


export function addTracksToPlaylist(playlistId, trackId) {
    return async (dispatch, getState) => {
        dispatch({
            type: ADD_TRACKS_TO_PLAYLIST,
            playlistId: playlistId,
            trackId: trackId,
        })
    }
}

export function removeTracksFromPlaylist(playlistId, trackId) {
    return async (dispatch, getState) => {
        dispatch({
            type: REMOVE_TRACKS_FROM_PLAYLIST,
            playlistId: playlistId,
            trackId: trackId,
        })
    }
}


export function renamePlaylist(playlistId, name) {
    return async (dispatch, getState) => {
        dispatch({
            type: RENAME_PLAYLIST,
            name: name,
            playlistId: playlistId,
        })
    }
}

export function removePlaylist(playlistId) {
    return async (dispatch, getState) => {
        dispatch({
            type: REMOVE_PLAYLIST,
            playlistId: playlistId,
        })
    }
}

export function addNewPlaylist(name, tracks = []) {
    return async (dispatch, getState) => {

        const { ...state } = getState();
        // console.log("Before", getState().playlists.allIds)
        // console.log();
        
        let newId;
        let lastId = state.playlists
            && state.playlists.allIds && state.playlists.allIds.concat().sort().pop();
        if (lastId) {
            newId = `PL-${parseInt(lastId.split("-")[1]) + 1}`;
        } else {
            newId = `PL-1`;
        }

        const date = (new Date()
            .toJSON()
            .replace(/[\-TZ]/g, "-")
            .split("-")
            .slice(0, 3)
            .reverse()
            .join("-"));

        dispatch({ type: ADD_NEW_PLAYLIST, playlistId: newId, name, tracks, date });
    }
}
