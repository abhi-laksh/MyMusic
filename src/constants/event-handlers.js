import TrackPlayer from 'react-native-track-player';
import { playerState, playerTrack } from '../actions/player';
import { addToQueue } from '../actions/queue';

async function eventHandler(store, data) {
	// Event Listening , e.g play;

	TrackPlayer.addEventListener('remote-play', () => {
		TrackPlayer.play();
	});

	TrackPlayer.addEventListener('remote-pause', () => {
		console.log('remote-pause');
		TrackPlayer.pause();
	});

	TrackPlayer.addEventListener('remote-previous', async () => {
		const state = store.getState();
		const { player, library } = state;
		const isFirst = ((library && player)
			&& library.queue
			&& library.queue.indexOf(player.currentTrack) === 0
		);

		if (!isFirst) {
			await TrackPlayer.skipToPrevious();
		} else {
			if (
				library
				&& library.queue
				&& library.queue.length
			) {
				await TrackPlayer.skip(library.queue[library.queue.length - 1]);
			}
		}
	});

	TrackPlayer.addEventListener('remote-next', async () => {
		const state = store.getState();
		const { player, library } = state;
		const isLast = ((library && player)
			&& library.queue
			&& library.queue.indexOf(player.currentTrack) === (library.queue.length - 1)
		);

		if (!isLast) {
			await TrackPlayer.skipToNext();
		} else {
			if (
				library
				&& library.queue
				&& library.queue.length
			) {
				await TrackPlayer.skip(library.queue[0]);
			}
		}
	});

	TrackPlayer.addEventListener('remote-stop', () => {
		console.log('remote-stop');
		TrackPlayer.stop();
	});

	TrackPlayer.addEventListener('remote-seek', async data => {
		console.log('remote-seek');
		await TrackPlayer.seekTo(data.position);
	});

	TrackPlayer.addEventListener('remote-jump-backward', async data => {
		console.log('remote-jump-backward');
		await TrackPlayer.seekTo(data.position - 10);
	});

	TrackPlayer.addEventListener('remote-jump-forward', async data => {
		console.log('remote-jump-forward');
		await TrackPlayer.seekTo(data.position + 10);
	});

	TrackPlayer.addEventListener('remote-duck', async data => {
		console.log('remote-duck');
		await TrackPlayer.setVolume(data.ducking ? 0.5 : 1);
	});

	// Player State
	TrackPlayer.addEventListener('playback-state', data => {
		store.dispatch(playerState(data.state));
	});

	TrackPlayer.addEventListener('playback-track-changed', data => {
		// let newTrack = await TrackPlayer.getTrack(data.nextTrack);
		store.dispatch(playerTrack(data.nextTrack));
	});

	TrackPlayer.addEventListener('playback-error', data => {
		var msg = data.message;
		console.log(msg);
	});

	TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
		const state = store.getState();
		const { player, library, tracks } = state;

		if (player.controlType === "loop-one") {
			await TrackPlayer.seekTo(0);
		} else {
			if (player.state === TrackPlayer.STATE_PLAYING) {
				const queue = library && library.queue;
				// console.log("ERRRRRRRRRRRRRRR", queue, player.init);
				if (queue.length && (await TrackPlayer.getQueue()).length) {
					if (player.controlType === "loop-all") {
						// Play In Order
						try {
							await TrackPlayer.skip(queue[0]);
						} catch (error) {
							console.log("ERRRR IN LOOP::::::::::", error)
						}
					} else {
						// Play In Shuffle
						try {
							let randomTrackId = this.props.queue
								&& this.props.queue.length
								&& this.props.queue[Math.floor(Math.random() * this.props.queue.length)];

							if (randomTrackId
								&& !JSON.stringify((await TrackPlayer.getQueue()))
									.includes(randomTrackId)
							) {
								await store.dispatch(addToQueue(randomTrackId));

								await TrackPlayer.skip(String(randomTrackId));

							} else {
								await TrackPlayer.skip(String(randomTrackId));
							}

						} catch (error) {
							console.log("ERRRR IN Shuffle:::::::::: ", error)
						}
					}
				}
			}
		}
	});
}

export default store => {
	return eventHandler.bind(null, store);
};