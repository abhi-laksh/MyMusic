import TrackPlayer from 'react-native-track-player';
import { playerState, playerTrack } from '../actions/player';

async function eventHandler(store, data) {
    // Event Listening , e.g play;

    TrackPlayer.addEventListener('remote-play', () => {
        TrackPlayer.play();
    })

    TrackPlayer.addEventListener('remote-pause', () => {
        console.log('remote-pause');
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener('remote-next', () => {
        console.log('remote-next');
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener('remote-previous', () => {
        console.log('remote-previous');
        TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener('remote-seek', (data) => {
        console.log('remote-seek');
        TrackPlayer.seekTo(data.position);
    });

    TrackPlayer.addEventListener('remote-jump-backward', (data) => {
        console.log('remote-jump-backward');
        TrackPlayer.seekTo((data.position - 10));
    });

    TrackPlayer.addEventListener('remote-jump-forward', (data) => {
        console.log('remote-jump-forward');
        TrackPlayer.seekTo((data.position + 10));
    });

    TrackPlayer.addEventListener('remote-duck', (data) => {
        console.log('remote-duck');
        TrackPlayer.setVolume(data.ducking ? 0.5 : 1);
    });


    // Player State
    TrackPlayer.addEventListener('playback-state', (data) => {
        store.dispatch(playerState(data.state));

    });

    TrackPlayer.addEventListener('playback-track-changed', async (data) => {
        let newTrack = await TrackPlayer.getTrack(data.nextTrack);
        store.dispatch(playerTrack(newTrack));
    });

    TrackPlayer.addEventListener('playback-error', (data) => {
        var msg = data.message;
        console.log(msg);
    });

};

export default (store) => {
    return eventHandler.bind(null, store)
}

// module.exports = function (store) {
//     return eventHandler.bind(null, store);
// };