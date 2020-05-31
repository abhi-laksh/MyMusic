import {
    PLAYER_INIT,
    PLAYER_STATE,
    PLAYER_TRACK,
    PLAYER_CONTROL,
} from '../actions/player';
import { SYNC_TRACKS } from '../actions/tracks';


const initialState = {
    state: null,
    init: false,
    currentTrack: null,
    controlType: "loop-all",
    error: false,
}


export function playerReducer(state = initialState, action) {
    switch (action.type) {
        case SYNC_TRACKS:
            return {
                ...state,
                currentTrack: action.currentTrack,
            };
        case PLAYER_INIT:
            return {
                ...state,
                init: true,
            };
        case PLAYER_STATE:
            return {
                ...state,
                state: action.state,
                error: action.error,
            };
        case PLAYER_TRACK:
            return {
                ...state,
                currentTrack: action.trackId,
            };
        case PLAYER_CONTROL:
            return {
                ...state,
                controlType: action.controlType,
            };
        default:
            return state;
    }
}
