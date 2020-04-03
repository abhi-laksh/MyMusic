import React, { useState } from "react";
import { View, ScrollView, Dimensions, TextInput } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
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
import MaskedView from '@react-native-community/masked-view';
import GradientText from "../../commons/GradientText";
import HeaderLayout from "../../commons/HeaderLayout";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from 'react-native-animatable';

function MyDrawer(props) {

    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const { theme, currentTheme, songName = "Unknown", ...others } = props;

    const contrastValue = (theme.dark.background === currentTheme.background) ? 0.25 : -0.1;
    const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));

    const themeColor = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.primary.light

    return (
        <ViewGradient
            gradientStyle={{}}
            viewStyle={{

            }}
            onlyBorder
            right
            borderWidth={1}
        >
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </ViewGradient>
    );
}

export default withTheme(MyDrawer);