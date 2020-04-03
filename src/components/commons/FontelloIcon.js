import React from "react";
import { createIconSetFromFontello } from "react-native-vector-icons";
import myMusicIconConfig from '../../assets/fonts/config.json';

const Icon = createIconSetFromFontello(myMusicIconConfig);

export default (props) => <Icon {...props} />;