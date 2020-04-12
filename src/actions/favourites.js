import AsyncStorage from '@react-native-community/async-storage';
// Favourites

export const UPDATE_FAVOURITES = 'UPDATE_FAVOURITES';
export const FAVOURITES_STATUS = 'FAVOURITES_STATUS';

export function favouritesStatus(syncing, error) {
    return {
        type: FAVOURITES_STATUS,
        syncing: syncing,
        error: error,
    }
}

export function updateFavourites(favourites) {
    AsyncStorage.setItem("favourites", JSON.stringify(favourites));
    return {
        type: UPDATE_FAVOURITES,
        favourites: favourites,
    };
}

export function addTracksToFavourites(tracks) {
    return async (dispatch, getState) => {
        const state = getState();

        const favourites = state.favourites;

        if (favourites) {
            const updatedTracks = _.uniqBy(favourites.concat(tracks), 'id');
            dispatch(updateFavourites(updatedTracks));
        }
    }
}

export function removeTracksFromFavourites(trackId) {
    return async (dispatch, getState) => {

        const state = getState();

        const favourites = state.favourites;

        if (favourites) {
            dispatch(favouritesStatus(true))
            let updatedTracks = _.filter(favourites,
                function (each) {
                    return !trackId.includes(each.id);
                });
            dispatch(updateFavourites(updatedTracks));
        }

    }
}

