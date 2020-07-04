import React from 'react';
import { View, StyleSheet } from 'react-native';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';

import MyAppText from '../../commons/MyAppText';
import { withTheme } from '../../globals/ThemeProvider';

const styles = StyleSheet.create({
	parent: {
		width: '100%',
	},
	fullwidth: {
		width: '100%',
	},
	timerParent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	timerText: {
		flex: 0,
	},
});

class SongProgressBar extends ProgressComponent {
	constructor(props) {
		super(props);

		this._seekOnDrag = this._seekOnDrag.bind(this);
		this._seek = this._seek.bind(this);
		this._pause = this._pause.bind(this);

		this.state = {
			isSliding: false,
			slideProgress: 0,
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.state.position !== nextState.position ||
			this.props.playerState !== nextProps.playerState ||
			this.state.slideProgress !== nextState.slideProgress
		);
	}

	// getDurMin($sec) {
	//     const formatTwoDigits = function (n) {
	//         return n < 10 ? ('0' + String(n)) : n;
	//     }

	//     const seconds = Number($sec);
	//     const ms = Math.floor(seconds) / 1000;
	//     const ss = Math.floor(ms / 60) % 60;
	//     const mm = Math.floor(ms / 60);

	//     return { min: formatTwoDigits(mm), sec: formatTwoDigits(ss) };
	// }

	formatPostion($sec) {
		const formatTwoDigits = function (n) {
			return n < 10 ? '0' + String(n) : n;
		};

		const $second = Number($sec);

		const min = parseInt($second / 60);
		const sec = parseInt($second % 60);

		return { min: formatTwoDigits(min), sec: formatTwoDigits(sec) };
	}

	// async _seekOnDrag(value) {
	//     const duration = this.state.duration;
	//     const toValue = (value * duration);

	//     await TrackPlayer.seekTo(toValue);
	//     TrackPlayer.play();
	// }

	_seekOnDrag(value) {
		this.setState(
			() => ({ isSliding: false }),
			() => {
				this._seek(value);
			},
		);
	}

	async _seek(value) {
		const duration = this.state.duration;
		const toValue = value * duration;

		await TrackPlayer.seekTo(toValue);
		TrackPlayer.play();
	}

	_pause() {
		this.setState(
			() => ({ isSliding: true }),
			() => {
				TrackPlayer.pause();
			},
		);
	}

	render() {
		const { currentTheme, theme } = this.props;

		const disabledColor = currentTheme.text.disabled;
		const disable = !this.props.currentTrackId;
		const color =
			currentTheme.name === 'dark'
				? theme.pallete.primary.main
				: theme.pallete.secondary.main;

		const duration = this.formatPostion(this.state.duration);
		const progress = this.getProgress();
		const progressTimer = this.formatPostion(this.state.position);
		const progressOnSlide = this.formatPostion(
			this.state.slideProgress * this.state.duration,
		);

		if (
			(this.props.controlType === "loop-one")
			&& (this.props.playerState === TrackPlayer.STATE_PLAYING)
			&& (parseInt(this.state.position) == parseInt(this.state.duration))
		) {
			TrackPlayer.seekTo(0);
		}

		return (
			<View style={styles.parent}>
				<View style={styles.fullwidth}>
					<Slider
						style={[
							styles.fullwidth,
							{
								height: 16,
							},
						]}
						minimumValue={0}
						maximumValue={1}
						value={progress}
						onSlidingStart={this._pause}
						onSlidingComplete={this._seekOnDrag}
						onValueChange={value => {
							this.setState({ slideProgress: value });
						}}
						disabled={disable}
						maximumTrackTintColor={color}
						minimumTrackTintColor={color}
						thumbTintColor={color}
					/>
				</View>
				<View style={styles.timerParent}>

					<MyAppText
						style={styles.timerText}
						size={14}
						color={color}
						variant="semiBold">
						{this.state.isSliding
							? `${progressOnSlide.min}:${progressOnSlide.sec}`
							: (progressTimer)
								? `${progressTimer.min}:${progressTimer.sec}`
								: '00:00'}
					</MyAppText>

					<MyAppText style={styles.timerText} size={14} variant="semiBold">
						{duration ? `${duration.min}:${duration.sec}` : '00:00'}
					</MyAppText>
				</View>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		playerState: state.player.state,
		controlType: state.player.controlType,
		currentTrackId: state.player.currentTrack,
	};
}

export default connect(mapStateToProps)(withTheme(SongProgressBar));
