import {
    LIBRARY_STATUS,
    LIBRARY_FAVOURITES,
    LIBRARY_QUEUE,
} from '../actions/library';
import { SYNC_TRACKS } from '../actions/tracks';

const initialState = {
    fetching: false,
    queue: [],
    favourites: [],
    error: false,
    newLoad: true,
}


export function libraryReducer(state = initialState, action) {
    switch (action.type) {
        case SYNC_TRACKS:
            return {
                ...state,
                queue: action.queue,
                favourites: action.favourites,
                error: (action.error || null)
            };
        case LIBRARY_STATUS:
            return {
                ...state,
                fetching: action.fetching,
                error: (action.error || null),
                newLoad: action.newLoad,
            };
        case LIBRARY_QUEUE:
            return {
                ...state,
                queue: action.queue,
                error: (action.error || null)
            };
        case LIBRARY_FAVOURITES:
            return {
                ...state,
                favourites: action.favourites,
                error: (action.error || null)
            };
        default:
            return state;
    }
}

