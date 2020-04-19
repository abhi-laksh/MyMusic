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

export function updateLibrary(tracks) {
    return {
        type: UPDATE_LIBRARY,
        tracks: tracks
    }
}

export function initializePlayer() {
    return async (dispatch, getState) => {

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
            let TPState = await TrackPlayer.getState();

            dispatch(playerState(TPState));

        } catch (e) {
            console.warn(`Updating Player ${e}`);
        }
    };
}



