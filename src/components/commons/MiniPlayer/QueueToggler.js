import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import FontelloIcon from "../FontelloIcon";
import Button from "../Button";
// import Button from "../SubMenu/Button";
import { withTheme } from "../../globals/ThemeProvider";
import ViewGradient from "../ViewGradient";
import SharpBG from "../SharpBG";
import { connect } from "react-redux";
import { toggleFavourites } from "../../../actions/favourites";
import AsyncStorage from "@react-native-community/async-storage";
import QueueModal from "../QueueModal";

class QueueToggler extends React.PureComponent {
    constructor(props) {
        super(props);
        this.modal = null;
        this.setModalRef = this.setModalRef.bind(this);
    }

    setModalRef(ref) {
        this.modal = ref;
    }

    render() {
        const { viewStyle, gradientStyle, buttonStyle, iconColor } = this.props;
        return (
            <>
                <ViewGradient
                    gradientStyle={gradientStyle}
                    viewStyle={viewStyle}
                    onlyBorder
                >
                    <Button
                        onPress={() => { this.modal.makeVisible() }}
                        style={buttonStyle}
                    >
                        <FontelloIcon name="playlist-music-outline" size={24} color={iconColor} />
                    </Button>
                </ViewGradient>
                <QueueModal
                    setModalRef={this.setModalRef}
                    closeModal={() => { this.modal.makeInVisible(); }}
                />
            </>
        );
    }
}

export default QueueToggler;