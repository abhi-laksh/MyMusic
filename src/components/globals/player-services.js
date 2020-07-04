import TrackPlayer from 'react-native-track-player';
// XXXXXX NOT IN USE XXXXXXX
module.exports = async function service() {

    TrackPlayer.addEventListener('remote-play', () => {
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener('remote-pause', () => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener('remote-next', () => {
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener('remote-previous', () => {
        TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener('remote-stop', () => {
        TrackPlayer.destroy();
    });
}