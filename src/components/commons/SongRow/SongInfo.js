import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MyAppText from "../MyAppText";


const styles = StyleSheet.create({
    songNameView: {
        justifyContent: "center",
        flexGrow: 1,
        height: "100%",
    },
})

class SongInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            ((this.props.songName !== nextProps.songName)
                || (this.props.songAuthor !== nextProps.songAuthor)
                || (this.props.isActive !== nextProps.isActive)
                || (this.props.activeColor !== nextProps.activeColor))  
        )
    }


    render() {
        const {
            songName = "Unknown Name",
            songAuthor = "Unknown Author",
            isActive,
            activeColor,
        } = this.props;

        return (
            <View
                style={styles.songNameView}
            >
                <MyAppText
                    size={14}
                    variant="semiBold"
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    color={isActive ? activeColor : null}
                >
                    {songName}
                </MyAppText>
                <MyAppText
                    fontName="bellota"
                    size={13}
                    variant="bold"
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                >
                    {songAuthor}
                </MyAppText>
            </View>
        )
    }
}
export default SongInfo;