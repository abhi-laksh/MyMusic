import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';

export const PLAYLIST_STATUS = 'PLAYLIST_STATUS';
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';

// P. L. STRUC : { name:"Foo" , tracks: [{},{},...] }

export function playlistStatus(syncing, error) {
    return {
        type: PLAYLIST_STATUS,
        syncing: syncing,
        error: error,
    }
}

export function updatePlaylists(playlists) {
    AsyncStorage.setItem("playlists", JSON.stringify(playlists));
    return {
        type: UPDATE_PLAYLIST,
        playlists: playlists,
    };
}


function findPlaylist(playlists, PLName) {
    const PLIndex = playlists.findIndex((each) => each.name === PLName);
    let PLObject;
    if (PLIndex > -1) {
        PLObject = playlists[PLIndex];
        return { index: PLIndex, playlist: PLObject };
    }
}

export function addNewPlaylist(name, tracks) {
    return async (dispatch, getState) => {
        const state = getState();
        const playlists = state.playlists;

        dispatch(playlistStatus(true));

        if (playlists) {
            const { index } = findPlaylist(playlists, name);
            if (index < 0) {
                playlists.push({ name: name, tracks: tracks });
                dispatch(updatePlaylists(playlists));
            }
        }
    }
}

export function deletePlaylist(name) {
    return async (dispatch, getState) => {
        const state = getState();
        const playlists = state.playlists;

        dispatch(playlistStatus(true));

        if (playlists) {
            const { index } = findPlaylist(playlists, name);
            if (index >= 0) {
                _.remove(playlists, function (each) {
                    return each.name === name;
                });
                dispatch(updatePlaylists(playlists));
            }
        }
    }
}

export function modifyPlaylist(name, newName) {
    return async (dispatch, getState) => {
        const state = getState();
        const playlists = state.playlists;

        dispatch(playlistStatus(true));

        if (playlists) {
            const { index, playlist } = findPlaylist(playlists, name);
            playlist.name = newName;
            playlists[index] = playlist;
            dispatch(updatePlaylists(playlists));
        }
    }
}

export function addTracksToPlaylist(name, tracks) {
    return async (dispatch, getState) => {
        const state = getState();
        const playlists = state.playlists;

        dispatch(playlistStatus(true));

        if (playlists) {
            const { index, playlist } = findPlaylist(playlists, name);
            const updatedTracks = _.uniqBy(playlist.tracks.concat(tracks), 'id');
            playlists[index] = { name: name, tracks: updatedTracks };
            dispatch(updatePlaylists(playlists));
        }
    }
}

export function removeTracksFromPlaylist(name, trackId) {
    return async (dispatch, getState) => {
        const state = getState();
        const playlists = state.playlists;

        dispatch(playlistStatus(true));


        if (playlists) {
            const { index, playlist } = findPlaylist(playlists, name);
            let updatedTracks = _.filter(playlist.tracks,
                function (each) {
                    return !trackId.includes(each.id);
                });
            playlists[index] = { name: name, tracks: updatedTracks }
            dispatch(updatePlaylists(playlists));
        }
    }
}

