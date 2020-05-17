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
        const { theme, currentTheme, PLName, navigation, PLTracks } = this.props;

        const color = currentTheme.text.primary;

        return (
            <View>
                <OptionsModal
                    setModal={this.setModal}
                    PLName={PLName}
                    navigation={navigation}
                    onCancel={this._closeModal}
                    PLTracks={PLTracks}
                />
                <Button
                    style={styles.buttons}
                    onPress={this._openModal}
                >
                    <FontelloIcon name="menu-dots" size={14} color={color} />
                </Button>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrack: state.player.currentTrack,
    };
}
export default connect(mapStateToProps)(withTheme(Options));