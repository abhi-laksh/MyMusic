import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

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
    let PLIndex = -1;
    let PLObject;
    let count = 0;

    for (var i = 0; i < playlists.length; i++) {
        let each = playlists[i];
        if ((count >= 2)) {
            break
        }
        if ((each.name === PLName)) {
            PLIndex = i;
            PLObject = each;
            count++;
        }
    }
    if (PLIndex > -1) {
        return { index: PLIndex, playlist: PLObject, count: count }
    } else {
        return { index: -1, playlist: null, count: 0 }
    }
}

export function addNewPlaylist(name, tracks = []) {
    return async (dispatch, getState) => {

        const state = getState();

        const playlists = state.playlists.playlists.concat();

        const date = (new Date()
            .toJSON()
            .replace(/[\-TZ]/g, "-")
            .split("-")
            .slice(0, 3)
            .reverse()
            .join("-"));

        // dispatch(playlistStatus(true));

        if (playlists.length > 0) {

            const { index, count } = findPlaylist(playlists, name);

            if ((index < 0) && (count <= 0)) {
                playlists.push({ name: name, tracks: tracks, date: date });
                dispatch(updatePlaylists(playlists));
            }

        } else {
            dispatch(updatePlaylists([{ name: name, tracks: tracks, date: date }]));
        }

    }
}

export function deletePlaylist(name) {
    return async (dispatch, getState) => {
        const state = getState();
        const playlists = state.playlists.playlists.concat();

        dispatch(playlistStatus(true));

        if (playlists.length > 0) {
            const { index } = findPlaylist(playlists, name);
            if (index > -1) {

                _.remove(playlists, function (each) {
                    return each.name === name;
                });

                // playlists.splice(index, 1);

                dispatch(updatePlaylists(playlists));
            }
        }
    }
}

export function modifyPlaylist(name, newName) {
    return (dispatch, getState) => {
        const state = getState();
        const playlists = state.playlists.playlists.concat();

        dispatch(playlistStatus(true));

        if (playlists.length > 0) {
            const { index, playlist } = findPlaylist(playlists, name);
            const indexNew = findPlaylist(playlists, newName).index;
            if ((index > -1) && (indexNew < 0)) {
                playlist.name = newName;
                playlists[index] = playlist;
                dispatch(updatePlaylists(playlists));
            }
        }
    }
}

export function addTracksToPlaylist(name, tracks) {
    return async (dispatch, getState) => {
        const state = getState();
        const playlists = state.playlists.playlists.concat();

        // dispatch(playlistStatus(true));

        if (playlists.length > 0) {
            const { index, playlist } = findPlaylist(playlists, name);
            if (index > -1) {
                const updatedTracks = _.uniqBy(playlist.tracks.concat(tracks), 'id');
                playlists[index] = { name: name, tracks: updatedTracks, date: playlist.date };
                dispatch(updatePlaylists(playlists));
            }
        }
    }
}

export function removeTracksFromPlaylist(name, trackId) {
    return async (dispatch, getState) => {
        const state = getState();
        const playlists = state.playlists.playlists.concat();

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

