import {
    UPDATE_LIBRARY,
    LIBRARY_STATUS,
    PLAYER_INIT,
    PLAYER_STATE,
    PLAYER_TRACK,
} from '../actions/player';



export function libraryReducer(state = { tracks: [], fetching: false, error: null }, action) {
    switch (action.type) {
        case UPDATE_LIBRARY:
            return {
                ...state,
                tracks: action.tracks,
                fetching: false,
                error: null,
            };
        case LIBRARY_STATUS:
            return {
                ...state,
                fetching: action.fetching,
                error: action.error
            };
        default:
            return state;
    }
}

export function playerReducer(state = { init: false, state: null, currentTrack: null }, action) {
    switch (action.type) {
        case PLAYER_INIT:
            return {
                ...state,
                init: true,
            };
        case PLAYER_STATE:
            return {
                ...state,
                state: action.state,
            };
        case PLAYER_TRACK:
            return {
                ...state,
                currentTrack: action.track,
            };
        default:
            return state;
    }
}
