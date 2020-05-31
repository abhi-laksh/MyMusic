import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { LIBRARY_QUEUE, libraryStatus } from './library';

// Update Queue in redux store
export function updateQueue(trackIds) {
    return {
        type: LIBRARY_QUEUE,
        queue: trackIds,
        error: null,
    }
}

export function addToQueue(trackId) {
    return async (dispatch, getState) => {
        try {
            const { ...state } = getState();
            let currentQueue = state.library && state.library.queue.concat();
            if (!currentQueue.includes(trackId)) {
                const track = state
                    && state.tracks
                    && state.tracks.byId[trackId]
                if (track) {
                    currentQueue.push(trackId);
                    console.log("ADD TO QUEUE", track, currentQueue);
                    await TrackPlayer.add(track);
                    dispatch(updateQueue(currentQueue));
                }
            }
        } catch (err) {
            console.warn(`ERR IN ADD TO QUEUE::: ${err}`);
            dispatch(libraryStatus(false, false, err));
        }
    }
}

export function removeFromQueue(trackId) {
    return async (dispatch, getState) => {
        const { ...state } = getState();
        const { library, player } = state;
        try {
            let queue = library.queue.concat();
            queue.splice(queue.indexOf(trackId), 1);
            if (!player.currentTrack === trackId) {
                await TrackPlayer.remove(trackId);
                dispatch(updateQueue(queue));
            } else {
                if (queue.length > 0) {
                    await TrackPlayer.skip(queue[0]);
                    await TrackPlayer.remove(trackId);
                    dispatch(updateQueue(queue));
                } else {
                    await TrackPlayer.stop();
                }
            }
        } catch (error) {
            console.warn(`ERR IN REMOVING QUEUE::: ${error}`);
            dispatch(libraryStatus(false, false, error));
        }
    }
}

export function clearQueue() {
    return async (dispatch, getState) => {
        try {
            const { ...state } = getState();
            const { library } = state;
            let queue = library.queue.concat();
            await TrackPlayer.remove(queue);
            queue = [];
            dispatch(updateQueue(queue));
        } catch (error) {
            console.warn(`ERR IN CLEARING QUEUE::: ${error}`);
            dispatch(libraryStatus(false, false, error));
        }
    }
}

// Add Multiple Songs to Queue (e,g:- Play all in Favs, Playlists, etc)
export function addMultipleToQueue(trackIds, reset = true) {
    return async (dispatch, getState) => {
        if (trackIds.length) {
            try {
                const { ...state } = getState();
                let currentQueue = state.library && state.library.queue;
                let currentQueueInTP = await TrackPlayer.getQueue();
                let tracks = state.tracks;
                if (reset) {
                    await TrackPlayer.reset();
                    currentQueue = [];
                }

                for (let i = 0; i < trackIds.length; i++) {
                    if (
                        !currentQueue.find((t) => trackIds.includes(t.id))
                        && !currentQueueInTP.find((t) => trackIds.includes(t.id))
                        && tracks
                    ) {
                        let track = tracks.byId[trackIds[i]];
                        await TrackPlayer.add(track);
                    }
                }

                dispatch(updateQueue(currentQueue.concat(trackIds)));
            } catch (err) {
                console.warn(`ERR IN ADD MULTIPLE QUEUE::: ${error}`);
                dispatch(libraryStatus(false, false, error));
            }
        }
    }
}

// // ?helpers

// export function shuffleQueue(queue) {
//     return async (dispatch, getState) => {
//         const { ...state } = getState();
//         let currentQueue = state.library && state.library.queue;
//         return currentQueue.includes(trackId);
//     }
// }
// export function sortQueue(queue) {
//     return async (dispatch, getState) => {
//         const { ...state } = getState();
//         let currentQueue = state.library && state.library.queue;
//         return currentQueue.includes(trackId);
//     }
// }