import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import MyAppText from "../../commons/MyAppText";
import Button from "../../commons/SubMenu/Button";
import Input from "../../commons/Input";
import { modifyPlaylist } from "../../../actions/playlists";
import ViewGradient from "../../commons/ViewGradient";
import { withTheme } from "../../globals/ThemeProvider";

const styles = StyleSheet.create({
    buttonGroupParent: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginBottom: 16,
        alignItems: "center",
        height: 48,
        // backgroundColor: "#333"
    },
    buttonSaveGradient: {
        flex: 0.45,
        borderRadius: 48,
    },
    buttonSaveParentView: {
        borderRadius: 48,
        padding: 0,
        overflow: "hidden",
        flex: 1,
    },
    buttonSaveChildView: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonCancel: {
        paddingVertical: 12,
        borderRadius: 48,
        flex: 0.45,
        borderWidth: 1,
    },
    textCenter: {
        textAlign: "center",
    },
})

class PlaylistEditScreen extends React.Component {
    constructor(props) {
        super(props);

        this.initialName = (this.props.route.params
            ? (this.props.route.params.name || "")
            : "")
        this.PLTracks = (this.props.route.params
            ? (this.props.route.params.tracks || [])
            : [])

        this.state = {
            value: this.initialName
        };
        this._handleInput = this._handleInput.bind(this);
        this._modifyPL = this._modifyPL.bind(this);
        this._cancel = this._cancel.bind(this);

    }



    _handleInput(val) {
        console.log(val);
        this.setState(() => ({ value: val }))
    }

    _modifyPL() {
        const name = this.initialName;
        const newName = this.state.value;
        if (name !== newName) {

            this.props.modifyPlaylist(name, newName);

            this.props.navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'PlaylistScreen'
                    },
                ]
            });

        } else {
            this.props.navigation.goBack();
        }
    }

    _cancel() {
        this.props.navigation.goBack();
    }

    render() {
        const { theme, currentTheme } = this.props;

        const contrastValue = (currentTheme.name === "dark") ? 0.4 : -0.3;
        const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));

        return (
            <View style={{
                flex: 1,
                backgroundColor: currentTheme.background,
                padding: 16,
            }}>
                <Input
                    selectTextOnFocus
                    // autoFocus={true}
                    placeholder={"Enter Playlist Name"}
                    value={this.state.value}
                    onChangeText={this._handleInput}
                    returnKeyType={"done"}
                    onSubmitEditing={this._modifyPL}
                />
                <View
                    style={styles.buttonGroupParent}
                >
                    <Button
                        // onPress={() => console.log("HIII")}
                        onPress={this._cancel}
                        style={[styles.buttonCancel, { borderColor: contrast }]}
                    >
                        <View
                        >

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
                        borderWidth={0}
                    >
                        <Button
                            onPress={this._modifyPL}
                            underlayColor={"rgba(255,255,255,0.08)"}
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
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrack: state.player.currentTrack,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        modifyPlaylist: (name, newName) => dispatch(modifyPlaylist(name, newName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PlaylistEditScreen));