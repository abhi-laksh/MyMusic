import {
    UPDATE_PLAYLIST,
    PLAYLIST_STATUS,
} from '../actions/playlists';

export function playlistReducer(state = { playlists: [], syncing: false, error: null }, action) {
    switch (action.type) {
        case UPDATE_PLAYLIST:
            return {
                ...state,
                playlists: action.playlists,
                syncing: false,
                error: null,
            };
        case PLAYLIST_STATUS:
            return {
                ...state,
                syncing: action.syncing,
                error: action.error
            };
        default:
            return state;
    }
}
