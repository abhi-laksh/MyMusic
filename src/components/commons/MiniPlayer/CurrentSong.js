import React from 'react';
import { View, StyleSheet } from "react-native";
import { withTheme } from '../../globals/ThemeProvider';
import Button from '../Button';
import MyAppText from "../MyAppText";
import Thumbnail from '../Thumbnail';

const styles = StyleSheet.create({
    fullheight: {
        height: "100%",
    },
    textParent: {
        justifyContent: "center",
        flexGrow: 1,
    },
    row: {
        flexDirection: "row",
    },
});

function CurrentSong(props) {
    const { theme, songName, songAuthor, currentTheme, songImage, onPress, ...others } = props;
    return (
        <Button
            style={styles.fullheight}
            onPress={onPress}
            {...others}
        >
            <View
                style={[
                    styles.fullheight,
                    styles.row
                ]}
            >
                {/* <Thumbnail
                    size={60}
                /> */}
                <View
                    style={styles.textParent}
                >
                    <MyAppText
                        variant="semiBold"
                        size={15}
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                    >
                        {songName}
                    </MyAppText>
                    <MyAppText
                        fontName="bellota"
                        size={12}
                        variant="bold"
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                    >
                        {songAuthor}
                    </MyAppText>
                </View>
            </View>
        </Button>
    );
}
export default withTheme(CurrentSong);