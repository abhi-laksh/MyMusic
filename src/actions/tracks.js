import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

export const ADD_TRACK = 'ADD_TRACK';
export const ADD_TRACKS_IN_BULK = 'ADD_TRACKS_IN_BULK';
export const DELETE_TRACKS = 'DELETE_TRACKS';
export const MODIFY_TRACKS = 'MODIFY_TRACKS';
export const SYNC_TRACKS = 'SYNC_TRACKS';


export function addTrack(track) {
    return async (dispatch, getState) => {
        const { ...state } = getState();
        let newId;
        let lastId = state.tracks
            && state.tracks.allIds && state.tracks.allIds.sort((a, b) => {
                return (parseInt(a.split("-")[1])) > (parseInt(b.split("-")[1]));
            }).pop();

        if (lastId) {
            newId = `T-${parseInt(lastId.split("-")[1]) + 1}`;
        } else {
            newId = `T-1`;
        }

        dispatch({
            type: ADD_TRACK,
            trackId: newId,
            title,
            url,
            size,
            mtime,
            dirPath,
            album,
            artist,
            duration,
            lyricsId
        });
    }
}

export function syncTracksInState(tracks) {
    return async (dispatch, getState) => {
        const { ...state } = getState();

        let currentTrack = state.player && state.player.currentTrack;
        // Playlist
        let oldPlaylistById = state.playlists && Object.assign({}, state.playlists.byId);
        let syncedPLById = {};
        let playlistAllIds = state.playlists && state.playlists.allIds.concat();

        let queue = state.library && state.library.queue.concat();

        let favourites = state.library && state.library.favourites.concat();

        let newId;

        let oldTracks = state.tracks && Object.assign({}, state.tracks.byId);
        let oldTracksIDdddd = Object.keys(oldTracks);
        oldTracks = Object.values(oldTracks);

        let oldTrackAllIds = state.tracks && state.tracks.allIds.concat();


        console.log();
        console.log("OLD::", oldTrackAllIds, oldTracksIDdddd);
        console.log();

        let lastId = oldTrackAllIds.concat().sort((a, b) => {
            return (parseInt(a.split("-")[1])) > (parseInt(b.split("-")[1]));
        }).pop();

        console.log();
        console.log("LAST ID:::", lastId);
        console.log();

        if (lastId) {
            newId = parseInt(lastId.split("-")[1]) + 1;
        } else {
            newId = 1;
        }

        console.log();
        console.log("NEW ID:::", newId);
        console.log();

        /* 

            ? For Deleted Tracks
            (Set Theory)
            A = New List ; B = Old List;
            ? where (maybe) A subset B;
            Hence, B - A = only B (deleted songs);
        */
        let deletedTracks = _.differenceBy(oldTracks, tracks, 'url');
        let deletedTracksByID = {};
        let deletedTracksAllIds = [];

        console.log("DEL", deletedTracks);

        if (deletedTracks.length) {

            for (i = 0; i < deletedTracks.length; i++) {

                deletedTracksAllIds.push(deletedTracks[i].id);
                deletedTracksByID[deletedTracks[i].id] = undefined;
            }

            // Delete from Playlist.
            for (i = 0; i < playlistAllIds.length; i++) {
                let plId = playlistAllIds[i]
                let eachPL = oldPlaylistById[plId];
                let newTracks = eachPL.tracks.filter((t) => (!deletedTracksAllIds.includes(t)));
                syncedPLById[plId] = {
                    ...eachPL,
                    tracks: newTracks,
                }
            }

            // Delete from QUEUE.
            queue = queue.filter((q) => (!deletedTracksAllIds.includes(q)));

            // Delete from FAVOURITES.
            favourites = favourites.filter((f) => (!deletedTracksAllIds.includes(f)));

            if (deletedTracksAllIds.includes(currentTrack)) {
                if (queue.length) {
                    currentTrack = (
                        queue.includes(currentTrack)
                        && queue[queue.indexOf(currentTrack)]
                    ) || (queue[0]);
                } else {
                    currentTrack = null;
                }
            }
        }

        // deletedTracks && deletedTracks.length && deletedTracks.forEach((item) => {
        //     deletedTracksAllIds.push(item.id);
        //     deletedTracksByID[item.id] = undefined;
        // });

        /* 
            ? For New Tracks
            (Set Theory)
            A = New List;
            B = Old List;
            where (maybe) A subset B;
            Hence, A - B = only A (new songs);
        */
        let newTracksObject = _.differenceBy(tracks, oldTracks, 'url');
        let newTracksById = {};
        let newAllTrackIds = [];

        newTracksObject.length && newTracksObject.forEach((track) => {
            let id = `T-${newId}`;

            newAllTrackIds.push(id);
            newTracksById[id] = {
                ...track,
                lyricsId: null,
                id: id
            }
            newId++;
        });

        console.log();
        console.log("NEW::", newAllTrackIds);
        console.log();

        console.log();
        console.log("OLD FILTER::", oldTrackAllIds.filter((e) => !deletedTracksAllIds.includes(e)));
        console.log();

        if (
            (deletedTracks.length > 0)
            // && !_.isEmpty(deletedTracksAllIds)
            // && !_.isEmpty(deletedTracksByID)
            || (newTracksObject.length > 0)
        ) {
            dispatch({
                type: SYNC_TRACKS,
                syncedTracksById: {
                    ...deletedTracksByID,
                    ...newTracksById
                },
                syncedTracksAllIds: [
                    ...oldTrackAllIds.filter((e) => !deletedTracksAllIds.includes(e)),
                    ...newAllTrackIds.concat()
                ],
                syncedTracksAllIds: _.union(
                    (oldTrackAllIds.filter((e) => !deletedTracksAllIds.includes(e))),
                    newAllTrackIds
                ),
                syncedPlaylistsById: Object.keys(syncedPLById).length ? syncedPLById : oldPlaylistById,
                queue,
                favourites,
                currentTrack,
            });
        }

    }
}

/* 


export function addTracksInBulk(tracks) {
    return async (dispatch, getState) => {
        const { ...state } = getState();
        let newId;
        let newTracksById = {};
        let newAllTrackIds = [];
        let oldTracks = state.tracks
            && Object.assign({}, state.tracks.byId);
        let lastId = state.tracks
            && state.tracks.allIds && state.tracks.allIds.concat().sort().pop();

        console.log("ADD MULTIPLE::::::", oldTracks);

        if (lastId) {
            newId = parseInt(lastId.split("-")[1]) + 1;
        } else {
            newId = 1;
        }
        tracks.forEach((track) => {
            if (!JSON.stringify(oldTracks).includes(track.url)) {
                let id = `T-${newId}`;
                newAllTrackIds.push(id);
                newTracksById[id] = {
                    ...track,
                    lyricsId: null,
                    id: id
                }
                newId++;
            }
        });

        dispatch({
            type: ADD_TRACKS_IN_BULK,
            newAllTrackIds,
            newTracksById
        })
    }
}



*/
export function deleteTracks(trackId) {
    return async (dispatch, getState) => {

        dispatch({
            type: DELETE_TRACKS,
            trackId: trackId,
        })
    }
}

export function modifyMetadata(trackId, newTrackInfo) {
    return async (dispatch, getState) => {

        await TrackPlayer.updateMetadataForTrack(trackId, newTrackInfo);

        dispatch({
            type: MODIFY_TRACKS,
            trackId,
            newTrackInfo
        })
    }
}

// Helper

export function getTrack(trackId) {
    return async (dispatch, getState) => {
        const { ...state } = getState();
        return state.tracks.byId[trackId];
    }
}