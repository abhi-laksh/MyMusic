import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "./Button";
import { connect } from "react-redux";
import MyAppText from "../MyAppText";
import ViewGradient from "../ViewGradient";
import MyModal from "../MyModal";
import Input from "../Input";
import { addNewPlaylist } from "../../../actions/playlists";

const styles = StyleSheet.create({

    modalTitle: {
        marginBottom: 16
    },
    buttonGroupParent: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginBottom: 16,
    },
    buttonSaveParentView: {
        borderRadius: 48,
        padding: 0,
        overflow: "hidden",
        flex: 1,
    },
    buttonCancel: {
        paddingVertical: 12,
        flex: 0.45,
        borderRadius: 48,
        borderWidth: 1,
    },
    buttonSaveGradient: {
        flex: 0.45,
        borderRadius: 48,
    },
    buttonSaveChildView: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    textCenter: {
        textAlign: "center",
    },
})



class NewPlaylistModal extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            value: ("NewPlaylist-" + (new Date().toJSON().replace(/[\ \.\:\-TZ]/g, ""))),
        };

        this._resetNewPLInput = this._resetNewPLInput.bind(this);
        this._addToNewPlaylist = this._addToNewPlaylist.bind(this);
        this._handleInput = this._handleInput.bind(this);
        this.close = this.close.bind(this);
    }
    close() {
        this.props.onCancel();
    }
    _resetNewPLInput() {
        const defaultName = ("NewPlaylist-" + (new Date().toJSON().replace(/[\ \.\:\-TZ]/g, "")));
        this.setState(() => ({ value: defaultName }))
    }

    _addToNewPlaylist() {
        const name = this.state.value;
        const { trackId } = this.props;
        if (trackId) {
            this.props.addNewPlaylist(name, [trackId]);
        } else {
            this.props.addNewPlaylist(name);
        }
        this.props.onCancel();
    }

    _handleInput(val) {
        // console.log(val);
        this.setState(() => ({ value: val }))
    }

    render() {
        const {
            theme,
            currentTheme,
            setRef,
        } = this.props;

        const color = currentTheme.text.primary;
        const bgContrast = theme.hexToRGB(color, 0.4);

        return (
            <MyModal
                setRef={setRef}
                onModalWillHide={this._resetNewPLInput}
            >
                <MyAppText 
                    numberOfLines={1}
                    size={18}
                    parentStyle={styles.modalTitle}
                >
                    Add New Playlist
                </MyAppText>

                <Input
                    selectTextOnFocus
                    autoFocus={true}
                    placeholder={"Enter Playlist Name"}
                    value={this.state.value}
                    onChangeText={this._handleInput} 
                    returnKeyType={"done"}
                    onSubmitEditing={this._addToNewPlaylist}
                />

                <View
                    style={styles.buttonGroupParent}
                >
                    <Button
                        // onPress={() => console.log("HIII")}
                        onPress={this.close}
                        style={[styles.buttonCancel, { borderColor: bgContrast }]}
                    >
                        <View>
                            <MyAppText
                                style={styles.textCenter}
                            >
                                Cancel
                            </MyAppText>
                        </View>
                    </Button>

                    <ViewGradient
                        gradientStyle={styles.buttonSaveGradient}
                        viewStyle={styles.buttonSaveParentView}
                        // onlyBorder
                        borderWidth={0}
                    >
                        <Button
                            onPress={this._addToNewPlaylist}
                            // onPress={() => this._resetNewPLInput()}
                            underlayColor={"rgba(255,255,255,0.2)"}
                        >
                            <View
                                style={styles.buttonSaveChildView}
                            >
                                <MyAppText
                                    style={styles.textCenter}
                                    color={"#fff"}
                                >
                                    Save
                                </MyAppText>
                            </View>
                        </Button>
                    </ViewGradient>
                </View>
            </MyModal>
        )

    }
}
function mapDispatchToProps(dispatch) {
    return {
        addNewPlaylist: (name, trackIds) => dispatch(addNewPlaylist(name, trackIds))
    }
}

export default connect(null, mapDispatchToProps)(withTheme(NewPlaylistModal));