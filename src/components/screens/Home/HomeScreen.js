import React from "react";
import { View, ScrollView, FlatList } from "react-native";
import MyAppText from "../../commons/MyAppText";
import SongRow from "../../commons/SongRow";
import MiniPlayer from "../../commons/MiniPlayer/MiniPlayer";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import ThemeToggler from "../../commons/ThemeToggler";
import { withTheme } from "../../globals/ThemeProvider";
import AsyncStorage from "@react-native-community/async-storage";
import TrackPlayer from 'react-native-track-player';

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.handleSongPress = this.handleSongPress.bind(this)
        this.state = {
            musicList: []
        }
    }
    async componentDidMount() {
        let musicData = await AsyncStorage.getItem('musicData');

        console.log("Started ")
        await TrackPlayer.setupPlayer({});
        console.log("setup done ")

        console.log("option updating");

        TrackPlayer.updateOptions({
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
            compactCapabilities: [
                TrackPlayer.CAPABILITY_PLAY,
                TrackPlayer.CAPABILITY_PAUSE,
                TrackPlayer.CAPABILITY_STOP,
            ],
        });

        console.log("option updated")
        musicData = JSON.parse(musicData)
        this.setState({ musicList: musicData.musicList })
        // console.log("musicList", musicData.musicList[0]);
        console.log("adding")
        await TrackPlayer.add(this.state.musicList[54]);
        console.log("added")


    }
    handleSongPress() {
        TrackPlayer.play();
    }
    render() {
        const { theme, currentTheme, navigation } = this.props;
        console.log("HomeScreen")
        return (
            <View style={{ flex: 1, backgroundColor: currentTheme.background }}>
                <FlatList
                    contentContainerStyle={{
                        padding: 16
                    }}
                    data={this.state.musicList}
                    renderItem={({ item }) => (
                        <SongRow
                            songName={item.title}
                            songAuthor={item.artist}
                            id={item.id}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
                <MiniPlayer navigation={navigation} />
            </View>
        );
    }
}
export default withTheme(HomeScreen);

/*

                <ScrollView
                    contentContainerStyle={{
                        padding: 16
                    }}
                >
                    {
                        this.state.musicList
                            ? (
                                this.state.musicList.slice(0, 5).map((each) => (
                                    <SongRow
                                        key={each.id}
                                        songName={each.title}
                                        songAuthor={each.artist}
                                        onPress={() => TrackPlayer.play()}
                                    />
                                ))
                            )
                            : null
                    }
                    <ThemeToggler />
                </ScrollView>

*/