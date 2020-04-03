import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { withTheme } from '../globals/ThemeProvider';
import SharpBG from './SharpBG';

const styles = StyleSheet.create({
    parent: {
        alignItems: "center",
        justifyContent: "center",
    },
})
const Thumbnail = (props) => {
    const [isDefault, setDefault] = useState(false);
    const { source, theme, currentTheme, scale = "80%", equal = false, size = 48, padding, style, parentStyle, ...others } = props;
    const path = '../../assets/images/music_thumbnail_default.png';
    return (
        <View
            style={[
                styles.parent,
                { width: size, height: equal ? size : "100%", },
                parentStyle
            ]}

        >
            <SharpBG style={{ borderRadius: 0 }} angle={45} />
            <Image
                source={(isDefault || !source) ? require(path) : source}
                onError={() => setDefault(true)}
                style={[
                    {
                        width: (isDefault || !source) ? scale : "100%",
                        height: (isDefault || !source) ? scale : "100%"
                    },
                    style
                ]}
                {...others}
            />
        </View>
    )
}
export default withTheme(Thumbnail);