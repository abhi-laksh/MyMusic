import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { withTheme } from '../globals/ThemeProvider';
import SharpBG from './SharpBG';
import FontelloIcon from './FontelloIcon';

const styles = StyleSheet.create({
    parent: {
        alignItems: "center",
        justifyContent: "center",
    },
})

const defaultImage = require('../../assets/images/music_thumbnail_default.png');

const Thumbnail = ({ source, iconSize = 24, theme, currentTheme, scale = "80%", equal = false, size = 48, padding, style, parentStyle, ...others }) => {
    const [isDefault, setDefault] = useState(false);
    // const path = '../../assets/images/music_thumbnail_default.png';
    const themeColor = currentTheme.name === "dark" ? theme.pallete.primary.light : theme.pallete.secondary.light;
    return (
        <View
            style={[
                styles.parent,
                { width: size, height: equal ? size : "100%", },
                parentStyle,

            ]}

        >
            {/* <SharpBG style={{ borderRadius: 0 }} angle={45} />
            <Image
                source={(isDefault || !source) ? defaultImage : source}
                onError={() => setDefault(true)}
                style={[
                    {
                        width: (isDefault || !source) ? scale : "100%",
                        height: (isDefault || !source) ? scale : "100%"
                    },
                    style
                ]}
                {...others}
            /> */}
            <FontelloIcon
                name="thumbnail"
                size={iconSize}
                color={themeColor}
            />
        </View>
    )
}
export default withTheme(Thumbnail);