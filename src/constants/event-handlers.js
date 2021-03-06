import TrackPlayer from 'react-native-track-player';
import { playerState, playerTrack } from '../actions/player';
import { addToQueue } from '../actions/queue';

async function eventHandler(store, data) {
	// Event Listening , e.g play;

	TrackPlayer.addEventListener('remote-play', () => {
		TrackPlayer.play();
	});

	TrackPlayer.addEventListener('remote-pause', () => {
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
		TrackPlayer.stop();
	});

	TrackPlayer.addEventListener('remote-seek', async data => {
		await TrackPlayer.seekTo(data.position);
	});

	TrackPlayer.addEventListener('remote-jump-backward', async data => {
		await TrackPlayer.seekTo(data.position - 10);
	});

	TrackPlayer.addEventListener('remote-jump-forward', async data => {
		await TrackPlayer.seekTo(data.position + 10);
	});

	TrackPlayer.addEventListener('remote-duck', async data => {
		await TrackPlayer.setVolume(data.ducking ? 0.5 : 1);
	});

	// Player State
	TrackPlayer.addEventListener('playback-state', data => {
		store.dispatch(playerState(data.state));
	});

	TrackPlayer.addEventListener('playback-track-changed', data => {
		// let newTrack = await TrackPlayer.getTrack(data.nextTrack);
		// const state = store.getState();
		// const { player } = state;
		// if (player && player.controlType == "loop-one" && player.state === TrackPlayer.STATE_PLAYING) {
		// 	TrackPlayer.seekTo(0);
		// } else {
		// 	store.dispatch(playerTrack(data.nextTrack));
		// }

		store.dispatch(playerTrack(data.nextTrack));

	});

	TrackPlayer.addEventListener('playback-error', data => {
		var msg = data.message;
		console.log(msg);
	});

	TrackPlayer.addEventListener('playback-queue-ended', async (data) => {
		const state = store.getState();
		const { player, library, tracks } = state;

		if (player.controlType == "loop-one") {

			await TrackPlayer.seekTo(0);

		} else {
			if (player.state === TrackPlayer.STATE_PLAYING) {

				const queue = library && library.queue;

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

							if (
								randomTrackId
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