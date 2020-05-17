import TrackPlayer from 'react-native-track-player';
import { playerState, playerTrack } from '../actions/player';

async function eventHandler(store, data) {
	// Event Listening , e.g play;

	TrackPlayer.addEventListener('remote-play', () => {
		TrackPlayer.play();
	});

	TrackPlayer.addEventListener('remote-pause', () => {
		console.log('remote-pause');
		TrackPlayer.pause();
	});

	TrackPlayer.addEventListener('remote-previous', () => {

		const state = store.getState();
		const { queue, player, controls } = state;
		const stateReady = (queue.queue && player.currentTrack && controls);

		const isFirst = ((stateReady)
			&& (queue.queue.findIndex((e) => e.id === player.currentTrack.id)) === (0)
		);

		if (!isFirst) {
			TrackPlayer.skipToPrevious();
		} else {
			if (
				controls.isLoop
				&& controls.loopType === "all"
				&& queue.queue
			) {
				TrackPlayer.skip(queue.queue[queue.queue.length - 1].id);
			}
		}
		console.log('remote-previous');
	});

	TrackPlayer.addEventListener('remote-next', () => {
		const state = store.getState();
		const { queue, player, controls } = state;
		const stateReady = (queue.queue && player.currentTrack && controls);

		const isLast = ((stateReady)
			&& (queue.queue.findIndex((e) => e.id === player.currentTrack.id)) === (queue.queue.length - 1)
		);

		if (!isLast) {
			TrackPlayer.skipToNext();
		} else {
			if (
				controls.isLoop
				&& controls.loopType === "all"
				&& queue.queue
			) {
				TrackPlayer.skip(queue.queue[0].id);
			}
		}
		console.log('remote-next');
	});

	TrackPlayer.addEventListener('remote-stop', () => {
		console.log('remote-stop');
		TrackPlayer.stop();
	});

	TrackPlayer.addEventListener('remote-seek', data => {
		console.log('remote-seek');
		TrackPlayer.seekTo(data.position);
	});

	TrackPlayer.addEventListener('remote-jump-backward', data => {
		console.log('remote-jump-backward');
		TrackPlayer.seekTo(data.position - 10);
	});

	TrackPlayer.addEventListener('remote-jump-forward', data => {
		console.log('remote-jump-forward');
		TrackPlayer.seekTo(data.position + 10);
	});

	TrackPlayer.addEventListener('remote-duck', data => {
		console.log('remote-duck');
		TrackPlayer.setVolume(data.ducking ? 0.5 : 1);
	});

	// Player State
	TrackPlayer.addEventListener('playback-state', data => {
		store.dispatch(playerState(data.state));
	});

	TrackPlayer.addEventListener('playback-track-changed', async data => {
		let newTrack = await TrackPlayer.getTrack(data.nextTrack);
		
		store.dispatch(playerTrack(newTrack));
	});

	TrackPlayer.addEventListener('playback-error', data => {
		var msg = data.message;
		console.log(msg);
	});

	TrackPlayer.addEventListener('playback-queue-ended', data => {
		const state = store.getState();
		const { controls, player, queue } = state;

		if (controls.isLoop) {
			if (controls.loopType === 'all' && queue.queue) {
				TrackPlayer.skip(queue.queue[0].id);
			} else {
				if (player.currentTrack) {
					TrackPlayer.skip(player.currentTrack.id);
				}
			}
		}
	});
}

export default store => {
	return eventHandler.bind(null, store);
};

// module.exports = function (store) {
//     return eventHandler.bind(null, store);
// };
