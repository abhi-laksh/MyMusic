import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';


export const PLAYER_INIT = 'PLAYER_INIT';
export const PLAYER_STATE = 'PLAYER_STATE';
export const PLAYER_TRACK = 'PLAYER_TRACK';

export const PLAYER_CONTROL = 'PLAYER_CONTROL';


export function initializePlayer() {
  return async (dispatch, getState) => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PLAY_FROM_ID,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
          TrackPlayer.CAPABILITY_SEEK_TO,
          TrackPlayer.CAPABILITY_SKIP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
        notificationCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        ],
      });
      dispatch({
        type: PLAYER_INIT,
      });
    } catch (err) {
      console.warn("INIT ERR::: ", err);
      dispatch(playerState(null, err));
    }
  };
}

export function playerTrack(trackId) {
  return {
    type: PLAYER_TRACK,
    trackId: trackId,
  };
}


export function playerState(state, error = null) {
  return {
    type: PLAYER_STATE,
    state: state,
    error: error
  };
}

export function updatePlayer() {
  return async (dispatch, getState) => {
    try {
      let TPState = await TrackPlayer.getState();
      dispatch(playerState(TPState));
    } catch (e) {
      console.warn(`ERR in Update PLayer :: ${e}`);
      dispatch(playerState(null, err));
    }
  };
}

export function playerControl(controlType) {
  return {
    type: PLAYER_CONTROL,
    controlType: controlType,
  };
}

export function switchControls() {
  return async (dispatch, getState) => {
    const { ...state } = getState();
    const { controlType } = state.player;
    // loop all to loop-one to shuffle 
    switch (controlType) {
      case "loop-all":
        dispatch(playerControl("loop-one"))
        return
      case "loop-one":
        dispatch(playerControl("shuffle"))
        return
      case "shuffle":
        dispatch(playerControl("loop-all"))
        return
      default:
        dispatch(playerControl("loop-all"))
    }
  };
}