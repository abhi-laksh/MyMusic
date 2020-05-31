import {
    ADD_LYRICS,
    MODIFY_LYRICS,
    REMOVE_LYRICS
} from '../actions/lyrics';
import { combineReducers } from 'redux';
import { DELETE_TRACKS } from '../actions/tracks';
// *Lyrics
/* 
        lyrics:{
            byId:{
                "track-1":{
                    id:"Track-1",
                    title:"Song Name",
                    album:"",
                    artist:"",
                    dirPath:"",
                    mtime:"",
                    size:"",
                    url:"",
                    lyricsId:"lrc-1",
                }
            }
            allIds:["track-1"]
        },
*/

function addLyrics(state, action) {
    const { lyricsId, trackId, lyrics } = action;
    const lyric = { id: lyricsId, trackId, lyrics }
    return {
        ...state,
        [lyricsId]: lyric
    }
}

function deleteLyrics(state, action) {
    const { ...newState } = state;
    const { lyricsId } = action;
    delete newState[lyricsId];
    return newState;
}

function modifyLyrics(state, action) {
    const { lyricsId, lyrics } = action;
    const lyric = state[lyricsId];
    return {
        ...state,
        [lyricsId]: {
            ...lyric,
            lyrics
        }
    }

}

export function lyricsById(state = {}, action) {
    switch (action.type) {
        case ADD_LYRICS:
            return addLyrics(state, action);
        case REMOVE_LYRICS:
            return deleteLyrics(state, action);
        case MODIFY_LYRICS:
            return modifyLyrics(state, action);
        default:
            return state;
    }
}

function addLyricsId(state, action) {
    const { lyricsId } = action;
    return state.concat(lyricsId);
}

function removeLyricsId(state, action) {
    const { lyricsId } = action;
    const newState = state.concat();
    newState.splice(newState.indexOf(lyricsId), 1)
    return newState;
}

export function allLyrics(state = [], action) {
    switch (action.type) {
        case ADD_LYRICS:
            return addLyricsId(state, action);
        case REMOVE_LYRICS:
            return removeLyricsId(state, action);
        case DELETE_TRACKS:
            return removeLyricsId(state, action);
        default:
            return state;
    }
}

export const lyricsReducer = combineReducers({ 
    byId: lyricsById,
    allIds: allLyrics,
});
