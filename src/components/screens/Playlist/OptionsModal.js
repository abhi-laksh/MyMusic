import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { withTheme } from "../../globals/ThemeProvider";
import MyAppText from "../../commons/MyAppText";
import FontelloIcon from "../../commons/FontelloIcon";
import Button from "../../commons/SubMenu/Button";
import MyModal from "../../commons/MyModal";
import { deletePlaylist } from "../../../actions/playlists";

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
        paddingVertical: 8
    },
    modalTitleParent: {
        marginBottom: 16,
    },
    modalTitle: {
        borderBottomWidth: 1,
        paddingBottom: 8,
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
            name: this.props.PLName,
            tracks: this.props.PLTracks,
        });

    }

    _deletePL() {
        this.props.deletePlaylist(this.props.PLName);
        this.props.navigation.reset({
            index: 0,
            routes: [
                {
                    name: 'PlaylistScreen'
                },
            ]
        });
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
            >
                <MyAppText
                    numberOfLines={1}
                    parentStyle={styles.modalTitleParent}
                    style={[
                        styles.modalTitle,
                        { borderBottomColor: contrast }
                    ]}

                >
                    {`Playlist Settings ${PLName ? ':- ' + PLName : ""}`}
                </MyAppText>
                <Button
                    onPress={this._navigateToEditScreen}
                    style={[
                        styles.modalButtons,
                        { marginBottom: 0 }
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
                        { marginBottom: 0 }
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
        deletePlaylist: (name) => dispatch(deletePlaylist(name))
    }
}
export default connect(null, mapDispatchToProps)(withTheme(OptionsModal));