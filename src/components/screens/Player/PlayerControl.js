import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import BottomButtons from './BottomButtons';
import Button from '../../commons/Button';
import FontelloIcon from '../../commons/FontelloIcon';
import { withTheme } from '../../globals/ThemeProvider';
import { addToQueue } from '../../../actions/queue';

const styles = StyleSheet.create({
	parent: {
		width: '100%',
		alignItems: 'center',
	},
	controlsParent: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		marginVertical: 36,
	},
	iconsParent: {
		width: 48,
		height: 48,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

class PlayerControl extends React.Component {
	constructor(props) {
		super(props);

		this._playPause = this._playPause.bind(this);
		this._skipToPrev = this._skipToPrev.bind(this);
		this._skipToNext = this._skipToNext.bind(this);
		this._jumpBackward = this._jumpBackward.bind(this);
		this._jumpForward = this._jumpForward.bind(this);
	}

	_playPause() {
		this.props.state == TrackPlayer.STATE_PLAYING
			? TrackPlayer.pause()
			: TrackPlayer.play();
	}

	async _skipToPrev() {
		const isLast =
			this.props.queue &&
			this.props.currentTrack &&
			this.props.queue.findIndex(e => e.id === this.props.currentTrack.id) ===
			0;
		if (!isLast) {
			await TrackPlayer.skipToPrevious();
		} else {
			if (this.props.controls.isLoop && this.props.queue) {
				await TrackPlayer.skip(
					this.props.queue[this.props.queue.length - 1].id,
				);
			}
		}
	}

	async _skipToNext() {
		const isLast =
			this.props.queue &&
			this.props.currentTrack &&
			this.props.queue.findIndex(e => e.id === this.props.currentTrack.id) ===
			this.props.queue.length - 1;
		if (!this.props.controls.isShuffle) {
			if (!isLast) {
				await TrackPlayer.skipToNext();
			} else {
				if (this.props.controls.isLoop && this.props.queue) {
					await TrackPlayer.skip(this.props.queue[0].id);
				}
			}
		} else {
			if (this.props.tracks && this.props.queue) {
				const randomTrack = this.props.tracks[Math.floor(Math.random() * this.props.tracks.length)];
				console.log("\n\n\n\nPLAYER CONTROL::::: \n\n\n\n",await TrackPlayer.getQueue());

				if (!(this.props.queue.find((e) => randomTrack.id === e.id))) {
					await this.props.addToQueue(randomTrack);
					await TrackPlayer.skip(String(randomTrack.id));
					TrackPlayer.play();
				} else {
					await TrackPlayer.skip(randomTrack.id);
				}
			}
		}
	}

	async _jumpBackward() {
		let pos = await TrackPlayer.getPosition();
		await TrackPlayer.seekTo(pos - 10);
	}

	async _jumpForward() {
		let pos = await TrackPlayer.getPosition();
		await TrackPlayer.seekTo(pos + 10);
	}

	render() {
		const { theme, currentTheme } = this.props;

		const iconColor = currentTheme.text.primary;

		const color =
			currentTheme.name === 'dark'
				? theme.pallete.primary.main
				: theme.pallete.secondary.main;

		const isPlaying = this.props.state == TrackPlayer.STATE_PLAYING;

		const isLast =
			this.props.queue &&
			this.props.currentTrack &&
			(this.props.queue.findIndex(
				e => e.id === this.props.currentTrack.id,
			)) === this.props.queue.length - 1;

		const isFirst = this.props.queue
			&& this.props.currentTrack
			&& (this.props.queue.findIndex(
				e => e.id === this.props.currentTrack.id
			)) === 0;

		return (
			<View style={styles.parent}>
				<View style={styles.controlsParent}>
					<Button
						onPress={this._skipToPrev}
						activeOpacity={0.5}
						style={styles.iconsParent}
						underlayColor={'transparent'}
						disabled={
							this.props.controls && (!this.props.controls.isLoop && isFirst)
						}>
						<FontelloIcon
							name="prev"
							size={20}
							color={
								!(
									this.props.controls &&
									(!this.props.controls.isLoop && isFirst)
								)
									? iconColor
									: currentTheme.text.disabled
							}
						/>
					</Button>

					<Button
						onPress={this._jumpBackward}
						activeOpacity={0.5}
						style={styles.iconsParent}
						underlayColor={'transparent'}>
						<FontelloIcon name="backward-10" size={28} color={iconColor} />
					</Button>

					{/* PLAY */}

					<Button
						onPress={this._playPause}
						activeOpacity={0.5}
						style={styles.iconsParent}
						underlayColor={'transparent'}>
						<FontelloIcon
							name={isPlaying ? 'pause' : 'play-my'}
							size={36}
							color={color}
						/>
					</Button>

					<Button
						onPress={this._jumpForward}
						activeOpacity={0.5}
						style={styles.iconsParent}
						underlayColor={'transparent'}>
						<FontelloIcon name="forward-10" size={28} color={iconColor} />
					</Button>

					<Button
						onPress={this._skipToNext}
						activeOpacity={0.5}
						style={styles.iconsParent}
						underlayColor={'transparent'}
						disabled={
							this.props.controls &&
							(
								(!this.props.controls.isLoop && isLast)
								&& !(this.props.controls.isShuffle)
							)
						}>
						<FontelloIcon
							name="next"
							size={20}
							color={
								this.props.controls &&
									(!(!this.props.controls.isLoop && isLast) || (this.props.controls.isShuffle))
									? iconColor
									: currentTheme.text.disabled
							}
						/>
					</Button>
				</View>

				{/* Lyrics Drower */}
				<View
					style={{
						width: '100%',
					}}>
					<BottomButtons navigation={this.props.navigation} />
				</View>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		state: state.player.state,
		tracks: state.library.tracks,
		currentTrack: state.player.currentTrack,
		queue: state.queue.queue,
		controls: state.controls,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		addToQueue: (track) => dispatch(addToQueue(track))
	}
} 

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PlayerControl));

/*
<View
                    style={{
                        width: "100%"
                    }}
                >
                    <ViewGradient
                        gradientStyle={
                            styles.lyricDrawerButtonGradient
                        }
                        viewStyle={styles.lyricDrawerButtonGradientView}
                        onlyBorder
                        top
                        left
                        right
                    >
                        <SharpBG
                            style={styles.lyricDrawerButtonSharpBG}
                            angle={45}
                        />
                        <Button
                            style={styles.lyricDrawerButton}
                            onPress={() => console.log("Playlist")}
                        >
                            <FontelloIcon name="lyrics" size={24} color={iconColor} />
                        </Button>
                    </ViewGradient>
                    <ViewGradient
                        gradientStyle={styles.lyricDrawerGradient}
                        viewStyle={styles.lyricDrawerGradientView}
                        onlyBorder
                        // borderWidth={1}
                        top
                        left
                        right
                    >
                        <GradientText>
                            <MyAppText
                                style={styles.lyricText}
                                parentStyle={styles.lyricTextParent}
                                size={15}
                                numberOfLines={1}
                                variant="bold"
                            >
                                Current Line of lyrics of song which is bring currently played.
                                Current Line of lyrics of song which is bring currently played.
                            </MyAppText>
                        </GradientText>
                    </ViewGradient>
                </View>
            </View >
*/
