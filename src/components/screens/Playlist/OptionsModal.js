import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { withTheme } from "../../globals/ThemeProvider";
import MyAppText from "../../commons/MyAppText";
import FontelloIcon from "../../commons/FontelloIcon";
import Button from "../../commons/SubMenu/Button";
import MyModal from "../../commons/MyModal";
import { removePlaylist } from "../../../actions/playlists";

const styles = StyleSheet.create({
    buttons: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonTextParent: {
        paddingHorizontal: 0,
        flex: 0,
        marginLeft: 16,
        width: "70%"
    },
    buttonText: {
        flex: 0,
    },
    modalButtons: {
        marginBottom: 16,
        paddingVertical: 12
    },
    modalTitleParent: {
        marginBottom: 16,
    },
    modalTitle: {
    },
})

class OptionsModal extends React.Component {
    constructor(props) {
        super(props);
        this._navigateToEditScreen = this._navigateToEditScreen.bind(this);
        this._deletePL = this._deletePL.bind(this);
    }

    _navigateToEditScreen() {

        this.props.onCancel();
        this.props.navigation.navigate('PlaylistEditScreen', {
            playlistId: this.props.playlistId
        });

    }

    _deletePL() {
        this.props.removePlaylist(this.props.playlistId);
        this.props.navigation.navigate('PlaylistScreen');
    }

    render() {
        const { theme, currentTheme, PLName } = this.props;

        const contrast = (currentTheme.name === "dark")
            ? theme.pallete.primary.light
            : theme.pallete.secondary.light;

        const color = currentTheme.text.primary;

        return (
            <MyModal
                setRef={this.props.setModal}
                isSetBG={false}
            >
                <MyAppText
                    numberOfLines={1}
                    parentStyle={styles.modalTitleParent}
                    style={{
                        borderBottomWidth: 1,
                        paddingBottom: 12,
                        borderBottomColor: contrast
                    }}
                >
                    {`Playlist Settings ${PLName ? ':- ' + PLName : ""}`}
                </MyAppText>
                <Button
                    onPress={this._navigateToEditScreen}
                    style={[
                        styles.modalButtons,
                        // { marginBottom: 0 }
                    ]}
                >
                    <View style={styles.buttonView}>

                        <Icon name={"square-edit-outline"} color={color} size={22} />
                        <MyAppText
                            parentStyle={styles.buttonTextParent}
                            style={styles.buttonText}
                            numberOfLines={1}
                        >
                            Edit Info
                        </MyAppText>
                    </View>
                </Button>
                <Button
                    onPress={() => console.log("Edit Info")}
                    onPress={this._deletePL}
                    style={[
                        styles.modalButtons,
                        // { marginBottom: 0 }
                    ]}
                >
                    <View style={styles.buttonView}>
                        <FontelloIcon name={"delete"} color={color} size={20} />
                        <MyAppText
                            parentStyle={styles.buttonTextParent}
                            style={styles.buttonText}
                            numberOfLines={1}
                        >
                            Delete
                        </MyAppText>
                    </View>
                </Button>
            </MyModal>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        removePlaylist: (name) => dispatch(removePlaylist(name))
    }
}
export default connect(null, mapDispatchToProps)(withTheme(OptionsModal));