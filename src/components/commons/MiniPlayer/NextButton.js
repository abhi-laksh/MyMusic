import React, { useState } from 'react';
import { withTheme } from '../../globals/ThemeProvider';
import Button from '../Button';
import FontelloIcon from '../FontelloIcon';
import { View } from 'react-native';
import SharpBG from '../SharpBG';

function NextButton(props) {
    // const [playPause, setPlayPause] = useState(true);
    const { theme, color, currentTheme, ...others } = props
    return (
        <View>
            <SharpBG style={{ borderRadius: 0, }} angle={45} />
            <Button
                onPress={() => console.log("Next")}
                {...others}
            >
                <FontelloIcon name="next" size={20} color={color || currentTheme.text.primary} />
            </Button>
        </View>
    );
}
export default withTheme(NextButton);