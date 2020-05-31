import React from "react";
import { View, StyleSheet } from "react-native";
import { withTheme } from "../../globals/ThemeProvider";
import { connect } from "react-redux";
import FontelloIcon from "../../commons/FontelloIcon";
import Button from "../../commons/Button";
import OptionsModal from "./OptionsModal";

const styles = StyleSheet.create({
    buttons: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
})

class Options extends React.PureComponent {

    constructor(props) {
        super(props);

        this.optionsModal = null;

        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this.setModal = this.setModal.bind(this);
    }

    setModal(ref) {
        this.optionsModal = ref;
    }
    _openModal() {
        this.optionsModal.makeVisible();
    }
    _closeModal() {
        this.optionsModal.makeInVisible();
    }

    render() {
        const { theme, currentTheme, playlistId, navigation } = this.props;

        const color = currentTheme.text.primary;

        return (
            <View>
                <OptionsModal
                    setModal={this.setModal}
                    playlistId={playlistId}
                    navigation={navigation}
                    onCancel={this._closeModal}
                />
                <Button
                    style={styles.buttons}
                    onPress={this._openModal}
                >
                    <FontelloIcon name="dots" size={14} color={color} />
                </Button>
            </View>
        );
    }
}

export default (withTheme(Options));