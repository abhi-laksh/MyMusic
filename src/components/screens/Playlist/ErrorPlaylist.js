import React from "react";
import { View, StyleSheet } from "react-native";

import { withTheme } from "../../globals/ThemeProvider";
import MyAppText from "../../commons/MyAppText";
import FontelloIcon from "../../commons/FontelloIcon";
import Button from "../../commons/SubMenu/Button";
import ErrorMessage from "../../commons/ErrorMessage";
import ViewGradient from "../../commons/ViewGradient";
import NewPlaylistModal from "../../commons/SubMenu/NewPlaylistModal";


const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: "center"
    },
    flexZero: {
        flex: 0
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

class ErrorPlaylist extends React.PureComponent {
    constructor(props) {
        super(props);

        this.setModalRef = this.setModalRef.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }


    setModalRef(ref) {
        this.PLModal = ref
    }

    closeModal() {
        this.PLModal.makeInVisible();
    }
    openModal() {
        this.PLModal.makeVisible();
    }

    render() {
        const { currentTheme } = this.props;

        const currentColor = currentTheme.text.primary;

        return (
            <View
                style={styles.parent}
            >
                <ErrorMessage
                    message={"No Playlist Found !"}
                    type={"track"}
                    size={20}
                    style={styles.flexZero}
                />
                <NewPlaylistModal
                    setRef={this.setModalRef}
                    onCancel={this.closeModal}
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
                                name="add-playlist"
                                size={24}
                                color={"#fff"}
                            /> Create
                    </MyAppText>
                    </ViewGradient>
                </Button>
            </View>
        );
    }
}

export default withTheme(ErrorPlaylist);