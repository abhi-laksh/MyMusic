import TrackPlayer from 'react-native-track-player';
import {loadTracks, sortMusicList} from '../constants/utils';
import AsyncStorage from '@react-native-community/async-storage';
import BackgroundFetch from 'react-native-background-fetch';
import {addMultipleToQueue} from './queue.js';
import _ from 'lodash';

export const UPDATE_LIBRARY = 'UPDATE_LIBRARY';
export const LIBRARY_STATUS = 'LIBRARY_STATUS';

export const PLAYER_INIT = 'PLAYER_INIT';
export const PLAYER_STATE = 'PLAYER_STATE';
export const PLAYER_TRACK = 'PLAYER_TRACK';

export const PLAYER_CONTROL_LOOP_STATUS = 'PLAYER_CONTROL_LOOP_STATUS';
export const PLAYER_CONTROL_LOOP_ALL = 'PLAYER_CONTROL_LOOP_ALL';
export const PLAYER_CONTROL_LOOP_ONE = 'PLAYER_CONTROL_LOOP_ONE';
export const PLAYER_CONTROL_SHUFFLE = 'PLAYER_CONTROL_SHUFFLE';

export function libraryStatus(fetching, error) {
  console.log(`${LIBRARY_STATUS} ERROR : ${error}`);
  return {
    type: LIBRARY_STATUS,
    fetching: fetching,
    error: error,
  };
}

export function updateLibrary(tracks) {
  return {
    type: UPDATE_LIBRARY,
    tracks: tracks,
  };
}

export function initializePlayer() {
  return async (dispatch, getState) => {
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
    console.log('UPDATED OPTION');
    dispatch({
      type: PLAYER_INIT,
    });
  };
}

export function playerTrack(track) {
  AsyncStorage.setItem('lastPlayed', JSON.stringify(track));
  return {
    type: PLAYER_TRACK,
    track: track,
  };
}

export function playerState(state) {
  return {
    type: PLAYER_STATE,
    state: state,
  };
}

export function repeatAll() {
  AsyncStorage.setItem(
    'loopStatus',
    JSON.stringify({isLoop: true, loopType: 'all'}),
  );
  return {type: PLAYER_CONTROL_LOOP_ALL};
}

export function repeatOne() {
  AsyncStorage.setItem(
    'loopStatus',
    JSON.stringify({isLoop: true, loopType: 'one'}),
  );
  return {type: PLAYER_CONTROL_LOOP_ONE};
}

export function repeatStatus(isLoop, loopType) {
  AsyncStorage.setItem(
    'loopStatus',
    JSON.stringify({isLoop: isLoop, loopType: loopType}),
  );
  return {type: PLAYER_CONTROL_LOOP_STATUS, isLoop: isLoop};
}

export function playerControlShuffle(isShuffle) {
  AsyncStorage.setItem('isShuffle', JSON.stringify(isShuffle));
  return {
    type: PLAYER_CONTROL_SHUFFLE,
    isShuffle: isShuffle,
  };
}

export function updatePlayer() {
  return async (dispatch, getState) => {
    try {
      let TPState = await TrackPlayer.getState();

      dispatch(playerState(TPState));
    } catch (e) {
      console.warn(`Updating Player ${e}`);
    }
  };
}
export function setLoop() {
  return async (dispatch, getState) => {
    const state = getState();
    const {controls} = state;
    if (!controls.isLoop) {
      dispatch(repeatStatus(true, controls.loopType));
    } else if (
      controls.loopType === 'all' &&
      (controls.isLoop && controls.prevLoopType !== 'one')
    ) {
      dispatch(repeatOne());
    } else if (
      controls.loopType === 'one' &&
      (controls.isLoop && controls.prevLoopType !== 'all')
    ) {
      dispatch(repeatAll());
    } else {
      dispatch(repeatStatus(false, controls.loopType));
    }
  };
}

export function setShuffle() {
  return async (dispatch, getState) => {
    const state = getState();
    if (state.controls) {
      dispatch(playerControlShuffle(!state.controls.isShuffle));
    }
  };
}
