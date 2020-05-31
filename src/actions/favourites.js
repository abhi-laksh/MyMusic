import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import { LIBRARY_FAVOURITES } from './library';

// Update favourites in redux store
export function updateFavourites(trackIds) {
    return {
        type: LIBRARY_FAVOURITES,
        favourites: trackIds,
        error: null,
    }
}

export function toggleFavourites(trackId) {
    return async (dispatch, getState) => { 
        const { ...state } = getState();
        let favourites = state.library && state.library.favourites;
        if (!favourites.includes(trackId)) {
            favourites.push(trackId);
            dispatch(updateFavourites(favourites));
        } else {
            favourites.splice(favourites.indexOf(trackId), 1);
            dispatch(updateFavourites(favourites));
        }
    }
}

// ?helpers

export function isFavourite(trackId) {
    return async (dispatch, getState) => {
        const { ...state } = getState();
        let favourites = state.library && state.library.favourites;
        return favourites.includes(trackId);
    }
}
