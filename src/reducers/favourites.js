import {
    FAVOURITES_STATUS,
    UPDATE_FAVOURITES
} from '../actions/favourites';


export function favouritesReducer(state = {}, action) {
    switch (action.type) {
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
