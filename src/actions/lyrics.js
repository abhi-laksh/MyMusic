import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

export const ADD_LYRICS = 'ADD_LYRICS';
export const REMOVE_LYRICS = 'REMOVE_LYRICS';
export const MODIFY_LYRICS = 'MODIFY_LYRICS';


export function addLyrics(trackId, lyrics) {
    return async (dispatch, getState) => {
        const { ...state } = getState();
        let newId;
        let lastId = state.lyrics
            && state.lyrics.allIds && state.lyrics.allIds.concat().sort((a, b) => {
                return (parseInt(a.split("-")[1])) > (parseInt(b.split("-")[1]));
            }).pop();

        if (lastId) {
            newId = `LRC-${parseInt(lastId.split("-")[1]) + 1}`;
        } else {
            newId = `LRC-1`;
        }

        dispatch({
            type: ADD_LYRICS,
            lyricsId: newId,
            trackId,
            lyrics,
        });
    }
}


export function deleteLyrics(trackId, lyricsId) {
    return async (dispatch, getState) => {
        dispatch({
            type: REMOVE_LYRICS,
            lyricsId,
            trackId
        });
    }
}


export function modifyLyrics(lyricsId, lyrics) {
    return async (dispatch, getState) => {
        const { ...state } = getState();
        dispatch({ type: MODIFY_LYRICS, lyricsId, lyrics });
    }
}
