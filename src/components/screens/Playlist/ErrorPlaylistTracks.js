import React from "react";
import { View, StyleSheet } from "react-native";

import TrackListModal from "./TrackListModal";
import { withTheme } from "../../globals/ThemeProvider";
import MyAppText from "../../commons/MyAppText";
import ErrorMessage from "../../commons/ErrorMessage";
import FontelloIcon from "../../commons/FontelloIcon";
import Button from "../../commons/SubMenu/Button";
import ViewGradient from "../../commons/ViewGradient";


const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: "center",
    },
    addButton: {
        // flex: 0,
        marginTop: 24,
        width: "60%",
        alignSelf: "center",
        borderRadius: 8,
    },
    addButtonGradient: {
        padding: 0,
        borderRadius: 8,
    },
    textParent: {
        paddingVertical: 16,
        paddingHorizontal: 0,
    },
    textCenter: {
        textAlign: "center"
    },
});


class ErrorPlaylistTracks extends React.PureComponent {
    constructor(props) {
        super(props);

        this.setModalRef = this.setModalRef.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);

        this.trackListModal = null;

    }

    setModalRef(ref) {
        this.trackListModal = ref
    }

    closeModal() {
        this.trackListModal.makeInVisible();
    }
    openModal() {
        this.trackListModal.makeVisible();
    }

    render() {
        const { currentTheme, navigation, playlistId } = this.props;

        const currentColor = currentTheme.text.primary;

        return (
            <View
                style={[
                    styles.parent,
                    {
                        backgroundColor: currentTheme.background,
                    }
                ]}
            >
                <ErrorMessage
                    message={"No Playlist Found !"}
                    type={"track"}
                    size={20}
                    style={{
                        flex: 0
                    }}
                />
                <TrackListModal
                    setModalRef={this.setModalRef}
                    onCancel={this.closeModal}
                    playlistId={playlistId}
                    navigation={navigation}
                />
                <Button
                    style={styles.addButton}
                    onPress={this.openModal}
                    activeOpacity={0.7}
                >
                    <ViewGradient
                        gradientStyle={styles.addButtonGradient}
                        viewStyle={styles.addButtonGradient}
                    >
                        <MyAppText
                            size={20}
                            parentStyle={styles.textParent}
                            style={styles.textCenter}
                            color={"#fff"}
                            >
                            <FontelloIcon 
                                name="add-music"
                                size={24}
                                color={"#fff"}
                            /> Add Song
                        </MyAppText>
                    </ViewGradient>
                </Button>
            </View>
        );
    }
}

export default withTheme(ErrorPlaylistTracks);