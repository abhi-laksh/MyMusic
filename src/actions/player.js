import TrackPlayer from 'react-native-track-player';
import { loadTracks, sortMusicList } from '../constants/utils';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundFetch from "react-native-background-fetch";

export const UPDATE_LIBRARY = 'UPDATE_LIBRARY';
export const LIBRARY_STATUS = 'LIBRARY_STATUS';

export const PLAYER_INIT = 'PLAYER_INIT';
export const PLAYER_STATE = 'PLAYER_STATE';
export const PLAYER_TRACK = 'PLAYER_TRACK';

export function libraryStatus(fetching, error) {
    console.log(`${LIBRARY_STATUS} ERROR : ${error}`);
    return {
        type: LIBRARY_STATUS,
        fetching: fetching,
        error: error
    };
}

export function fetchLibrary() {
    return async (dispatch, getState) => {
        const state = getState();
        var data, lastPlayed;
        if (state.library && (state.library.fetching || state.library.tracks)) {
            return;
        }

        dispatch(libraryStatus(true));

        data = await AsyncStorage.getItem('musicData');

        if (data) {
            console.log("Fetching from AsyncStorage")

            data = JSON.parse(data);

            sortMusicList(data.musicList);

            dispatch({
                type: UPDATE_LIBRARY,
                tracks: data.musicList
            });
        }

        BackgroundFetch.configure({
            minimumFetchInterval: 1,
        }, async (taskId) => {
            // This is the fetch-event callback.
            console.log("[BackgroundFetch] taskId: ", taskId);

            try {
                console.log("Fetching from Device Storage.");

                let data = await loadTracks();

                sortMusicList(data.musicList);

                AsyncStorage.setItem('musicData', JSON.stringify(data));

                dispatch({
                    type: UPDATE_LIBRARY,
                    tracks: data.musicList
                });

            } catch (e) {
                dispatch(libraryStatus(false, e));
            };

            // Finish, providing received taskId.
            BackgroundFetch.finish(taskId);
        });

        lastPlayed = await AsyncStorage.getItem('lastPlayed');
        lastPlayed = JSON.parse(lastPlayed);

        if (lastPlayed && lastPlayed.id) {
            console.log("lastPlayed ", lastPlayed)

            await TrackPlayer.add(lastPlayed);

            dispatch({
                type: PLAYER_TRACK,
                track: lastPlayed
            });
            
        } else {
            const firstTrack = data.musicList[0];
            console.log("firstTrack :", firstTrack);

            dispatch(playerTrack(firstTrack));

            await TrackPlayer.add(firstTrack);
        }

    }
}

export function initializePlayer() {
    return async (dispatch, getState) => {

        const state = getState();

        await TrackPlayer.setupPlayer({});
        TrackPlayer.updateOptions({
            capabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PLAY_FROM_ID,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP,
                TrackPlayer.CAPABILITY_JUMP_FORWARD,
                TrackPlayer.CAPABILITY_JUMP_BACKWARD,
                TrackPlayer.CAPABILITY_SEEK_TO,
                TrackPlayer.CAPABILITY_SKIP,
                TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
            ],
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP,
            ],
        });

        dispatch({
            type: PLAYER_INIT
        })
    }
}

export function playerTrack(track) {
    AsyncStorage.setItem('lastPlayed', JSON.stringify(track));
    return {
        type: PLAYER_TRACK,
        track: track
    }
}

export function playerState(state) {
    return {
        type: PLAYER_STATE,
        state: state
    }
}


export function updatePlayer() {
    return async (dispatch, getState) => {
        try {
            const state = getState();

            let TPState = await TrackPlayer.getState();

            dispatch(playerState(TPState));

            // let track = await TrackPlayer.getTrack(await TrackPlayer.getCurrentTrack());

            // dispatch(playerTrack(track));
            // await TrackPlayer.add();

        } catch (e) {
            console.warn(`Updating Player ${e}`);
        }
    };
}



