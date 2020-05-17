import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';

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
    return (dispatch, getState) => {
        const state = getState();

        const favourites = state.favourites.favourites.concat();

        if (favourites) {
            const updatedTracks = _.uniqBy(favourites.concat(tracks), 'url');
            dispatch(updateFavourites(updatedTracks));
        }
    }
}

export function removeTracksFromFavourites(trackId) {
    return async (dispatch, getState) => {

        const { ...state } = getState();

        const favourites = state.favourites.favourites.concat();

        if (favourites) {
            // dispatch(favouritesStatus(true))
            let updatedTracks = _.filter(favourites,
                function (each) {
                    return !trackId.includes(each.id);
                });
            dispatch(updateFavourites(updatedTracks));
        }

    }
}


export function toggleFavourites(track) {

    return (dispatch, getState) => {
        const { ...state } = getState();

        const favourites = state.favourites.favourites.concat();

        const trackInFav = favourites.findIndex((e) => e.id === track.id);
        // const trackInFav = JSON.stringify(favourites).includes(track.id);

        if (trackInFav > -1) {

            // const updatedTracks = favourites.filter(function (each) {
            //     return ![track.id].includes(each.id);
            // });

            favourites.splice(trackInFav, 1);


            dispatch(updateFavourites(favourites));

            // dispatch(removeTracksFromFavourites([trackInFav.id]))

        } else {

            favourites.push(track);

            dispatch(updateFavourites(favourites));

            // dispatch(addTracksToFavourites(track));
        }
        // console.log("updatedTracks::::::::", favourites, trackInFav);
    }
}