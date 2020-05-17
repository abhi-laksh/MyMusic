import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

// Queue
export const UPDATE_QUEUE = 'UPDATE_QUEUE';
export const QUEUE_STATUS = 'QUEUE_STATUS';

export const ADD_SONG_TO_QUEUE = 'ADD_SONG_TO_QUEUE';
export const REMOVE_SONG_FROM_QUEUE = 'REMOVE_SONG_FROM_QUEUE';


// Checking queue is synced.

export function queueStatus(syncing, error) {
    return {
        type: QUEUE_STATUS,
        syncing: syncing,
        error: error,
    }
}
// Update Queue in redux store
export function updateQueue(tracks) {
    AsyncStorage.setItem("queue", JSON.stringify(tracks));
    return {
        type: UPDATE_QUEUE,
        queue: tracks
    }
}

// Add Song To Queue
export function addToQueue(track) {
    return async (dispatch, getState) => {
        const { ...currentState } = getState();

        let currentQueue = currentState.queue.queue.concat();

        if (!(currentQueue.findIndex((each) => each.id === track.id) > -1)) {

            currentQueue.push(track);
            await TrackPlayer.add(track);

            dispatch(updateQueue(currentQueue));
        };
    }
}

// Add Multiple Songs to Queue (e,g:- Play all in Favs, Playlists, etc)
export function addMultipleToQueue(tracks, reset = true) {
    return async (dispatch, getState) => {

        const { ...currentState } = getState();

        let currentQueue = currentState.queue.queue.concat();
        if (reset) {
            await TrackPlayer.reset();
            currentQueue = [];
        }
        for (let i = 0; i < tracks.length; i++) {
            if (!(JSON.stringify(currentQueue).includes(tracks[i].id))) {
                await TrackPlayer.add(tracks[i]);
            }
        }
        dispatch(updateQueue(tracks));

    }
}

// Remove Song to Queue
export function removeFromQueue(trackId) {
    return async (dispatch, getState) => {
        // console.log("removeFromQueue ", await TrackPlayer.getQueue())
        // console.log()

        const state = getState();

        if (!state.player.currentTrack.id === trackId) {

            await TrackPlayer.remove(trackId);

            // console.log()

            let currentQueue = await TrackPlayer.getQueue();

            // console.log("removeFromQueue NO CURRENT ", currentQueue)

            dispatch(updateQueue(currentQueue));

        } else {

            const [...currentQueue] = await TrackPlayer.getQueue();

            // const lastTrackInQueue = currentQueue.find((e) => e.id === trackId);

            const newQueue = currentQueue.filter((e) => e.id !== trackId);

            await TrackPlayer.skip(newQueue[(newQueue.length - 1)].id);

            await TrackPlayer.remove(trackId);

            // console.log()

            // console.log("removeFromQueue ", newQueue)

            dispatch(updateQueue(newQueue));

        }
    }
}