import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";

import MyAppText from "./MyAppText";
import Button from "./SubMenu/Button";
import SongList from "./SongRow/SongList";
import FontelloIcon from "./FontelloIcon";
import MyModal from "./MyModal";
import ErrorMessage from "./ErrorMessage";

import { addTracksToPlaylist } from "../../actions/playlists";
import { withTheme } from "../globals/ThemeProvider";
import { clearQueue } from "../../actions/queue";

const styles = StyleSheet.create({
    parent: {
        flex: 0.6,
    },
    modalTitle: {
        paddingVertical: 16,
    },
    modalToggler: {
        justifyContent: "center",
        width: 36,
        height: "100%",
        alignItems: "center",
        // backgroundColor: "#666"
    },
})

class QueueModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.clearQueue = this.clearQueue.bind(this);
    }
    clearQueue() {
        this.props.closeModal();
        this.props.clearQueue();
    }
    render() {
        const { theme, currentTheme } = this.props;
        const opacBG = theme.hexToRGB(currentTheme.background, 0.8);
        return (
            <MyModal
                setRef={this.props.setModalRef}
                gradientStyle={styles.parent}
                onModalHide={this._addSongsToPlaylist}
                viewStyle={{
                    padding: 0,
                    flex: 1,
                }}
                bgStyle={{
                    flex: 1,
                }}
            >
                {this.props.queue && this.props.queue.length <= 0
                    ? (
                        <ErrorMessage
                            type={"track"}
                            message={"Queue is empty !\nAdd Some Songs."}
                            style={{
                                height: "100%",
                            }}
                        />
                    )
                    : (
                        <SongList
                            trackIds={this.props.queue}
                            currentTrackId={(this.props.currentTrackId)}
                            contentContainerStyle={{
                                padding: 0,
                            }}
                            ListHeaderComponent={
                                <View
                                    style={{
                                        backgroundColor: opacBG,
                                        flex: 1,
                                        borderBottomColor: theme.pallete.primary.main,
                                        borderBottomWidth: 2,
                                        marginBottom: 16,
                                        flexDirection: "row",
                                    }}
                                >
                                    <MyAppText
                                        numberOfLines={1}
                                        size={16}
                                        parentStyle={StyleSheet.compose([
                                            styles.modalTitle,
                                            {
                                                // backgroundColor: "#666",
                                                flex: 1,
                                            }
                                        ])}
                                        style={{
                                            // flex: 0,
                                        }}
                                    >
                                        Queue
                                        </MyAppText>
                                    <Button
                                        style={{
                                            width: 36,
                                            height: 36,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            // backgroundColor: "#66a",
                                            alignSelf: "center",
                                            marginRight: 16,
                                        }}
                                        onPress={this.clearQueue}
                                    >
                                        <FontelloIcon
                                            name={"delete-sweep"}
                                            size={24}
                                            color={currentTheme.text.primary}
                                        />
                                    </Button>
                                </View>
                            }
                            stickyHeaderIndices={[0]}
                        />
                    )
                }
            </MyModal>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentTrackId: state.player.currentTrack,
        queue: state.library.queue,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clearQueue: () => dispatch(clearQueue())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(QueueModal));