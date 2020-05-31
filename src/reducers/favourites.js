import {
    FAVOURITES_STATUS,
    UPDATE_FAVOURITES
} from '../actions/favourites';
import { SYNC_TRACKS } from '../actions/tracks';


export function favouritesReducer(state = { favourites: [], syncing: false, error: null }, action) {
    switch (action.type) {
        case SYNC_TRACKS:
            return {
                ...state,
                favourites: action.favourites,
                syncing: false,
                error: null,
            };
        case UPDATE_FAVOURITES:
            return {
                ...state,
                favourites: action.favourites,
                syncing: false,
                error: null,
            };
        case FAVOURITES_STATUS:
            return {
                ...state,
                syncing: action.syncing,
                error: action.error
            };
        default:
            return state;
    }
}
// XX