import {
    UPDATE_QUEUE,
    QUEUE_STATUS
} from '../actions/queue';
import { SYNC_TRACKS } from '../actions/tracks';

export function queueReducer(state = { queue: [], syncing: false, error: null }, action) {
    switch (action.type) {
        case SYNC_TRACKS:
            return {
                ...state,
                queue: action.queue,
                syncing: false,
                error: null,
            };
        case UPDATE_QUEUE:
            return {
                ...state,
                queue: action.queue,
                syncing: false,
                error: null,
            };
        case QUEUE_STATUS:
            return {
                ...state,
                syncing: action.syncing,
                error: action.error
            };
        default:
            return state;
    }
}
