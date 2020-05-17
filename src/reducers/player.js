import {
    UPDATE_LIBRARY,
    LIBRARY_STATUS,
    PLAYER_INIT,
    PLAYER_STATE,
    PLAYER_TRACK,
    PLAYER_CONTROL_LOOP_ALL,
    PLAYER_CONTROL_LOOP_ONE,
    PLAYER_CONTROL_LOOP_STATUS,
    PLAYER_CONTROL_SHUFFLE
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

export function playerControlReducer(state = { isLoop: false, loopType: "all", prevLoopType: null, isShuffle: false }, action) {
    switch (action.type) {
        case PLAYER_CONTROL_LOOP_STATUS:
            return {
                ...state,
                isLoop: action.isLoop,
                prevLoopType:state.loopType,
            };
        case PLAYER_CONTROL_LOOP_ONE:
            return {
                ...state,
                isLoop: true,
                loopType: "one",
                prevLoopType:state.loopType,
            };
        case PLAYER_CONTROL_LOOP_ALL:
            return {
                ...state,
                isLoop: true,
                loopType: "all",
                prevLoopType:state.loopType,
            };
        case PLAYER_CONTROL_SHUFFLE:
            return {
                ...state,
                isShuffle: action.isShuffle,
            };
        default:
            return state;
    }
}
