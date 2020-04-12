import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';

// Queue
export const UPDATE_QUEUE = 'UPDATE_QUEUE';
export const QUEUE_STATUS = 'QUEUE_STATUS';

export const ADD_SONG_TO_QUEUE = 'ADD_SONG_TO_QUEUE';
export const REMOVE_SONG_FROM_QUEUE = 'REMOVE_SONG_FROM_QUEUE';

export function queueStatus(syncing, error) {
    return {
        type: QUEUE_STATUS,
        syncing: syncing,
        error: error,
    }
}

export function updateQueue(tracks) {
    AsyncStorage.setItem("queue", JSON.stringify(tracks));
    return {
        type: UPDATE_QUEUE,
        queue: tracks
    }
}

export function addToQueue(track) {
    return async (dispatch) => {
        let currentQueue = await TrackPlayer.getQueue();
        if (!currentQueue.find((each) => each.id === track.id)) {
            dispatch(queueStatus(true));

            currentQueue.push(track);

            await TrackPlayer.add(track);

            dispatch(updateQueue(currentQueue));

        };
    }
}

export function removeFromQueue(trackId) {
    return async (dispatch) => {

        await TrackPlayer.remove(trackId);

        let currentQueue = await TrackPlayer.getQueue();

        dispatch(updateQueue(currentQueue));
    }
}

