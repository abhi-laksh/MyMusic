import React from "react";
import { View, StyleSheet } from "react-native";
import MyAppText from "../../commons/MyAppText";
import SongRow from "../../commons/SongRow";
import MiniPlayer from "../../commons/MiniPlayer/MiniPlayer";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import ThemeToggler from "../../commons/ThemeToggler";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/Button";
import SharpBG from "../../commons/SharpBG";
import Thumbnail from "../../commons/Thumbnail";
import ActionButton from "./ActionButtons";
import PlayerControl from "./PlayerControl";
import AlbumImage from "./AlbumImage";
import Slider from '@react-native-community/slider';



const styles = StyleSheet.create({
    parent: {
        marginBottom: 16,
        width: "100%",
        // backgroundColor:"#666",
    },
    fullwidth: {
        width: "100%",
    },
    timerParent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    timerText: {
        flex: 0
    },
    fullwidth: {
        width: "100%",
    },
    fullwidth: {
        width: "100%",
    },
    fullwidth: {
        width: "100%",
    },
    fullwidth: {
        width: "100%",
    }
})


class SongProgressBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideValue: 50,
            songMin: 0,
            songSec: 0,
            songProgress: 0,
        }
    }

    digitAdjustment(number) {
        if (number <= 9) {
            return `0${number}`;
        } else {
            return number;
        }
    }
    getDurMin($sec) {
        // if($sec.isNaN()){}
        const $second = Number($sec);
        var min = parseInt($second / 60);
        var sec = parseInt($second % 60);
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }
        // console.log($second)
        return { min: min, sec: sec };
    }

    render() {
        const { currentTheme, theme } = this.props;
        const color = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.secondary.main
        return (
            <View
                style={styles.parent}
            >
                <View
                    style={styles.fullwidth}
                >
                    <Slider
                        style={[
                            styles.fullwidth,
                            {
                                height: 16,
                            }
                        ]}
                        minimumValue={0}
                        maximumValue={100}
                        value={this.state.slideValue}
                        onValueChange={(value) => this.setState({ slideValue: value })}
                        maximumTrackTintColor={color}
                        minimumTrackTintColor={color}
                        thumbTintColor={color}
                    />
                </View>
                <View
                    style={styles.timerParent}
                >
                    <MyAppText
                        style={styles.timerText}
                        size={12}
                    >
                        {`${this.digitAdjustment(this.state.songMin)}:${this.digitAdjustment(this.state.songSec)}`}
                    </MyAppText>
                    <MyAppText
                        style={styles.timerText}
                        size={12}
                    >
                        {`${this.digitAdjustment(this.state.songMin)}:${this.digitAdjustment(this.state.songSec)}`}
                    </MyAppText>
                </View>
            </View>
        );
    }
}
export default withTheme(SongProgressBar);