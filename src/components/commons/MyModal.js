import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { connect } from "react-redux";
import ViewGradient from "./ViewGradient";
import Modal from "react-native-modal";
import CommonBG from "../CommonBG";
const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0
    },
    modalGradient: {
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        // padding:0,
        paddingBottom: 0,
        overflow: "hidden"
    },
})


class MyModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    makeVisible() {
        let isOpen = this.state.isOpen;
        this.setState(() => ({ isOpen: true }));
    }

    makeInVisible() {
        this.setState(() => ({ isOpen: false }));
    }
    componentDidMount() {
        this.props.setRef(this);
    }
    componentWillUnmount() {
        this.props.setRef(undefined);
    }
    render() {
        const {
            children,
            style,
            gradientStyle,
            viewStyle,
            isOpen,
            setRef,
            bgStyle,
            isSetBG = true,
            ...others } = this.props;

        return (

            <Modal
                isVisible={this.state.isOpen}
                style={[
                    styles.modal,
                    style
                ]}
                onBackButtonPress={() => this.makeInVisible()}
                onBackdropPress={() => this.makeInVisible()}
                animationIn={'bounceInUp'}
                animationOut={'bounceOutDown'}
                animationInTiming={200}
                animationOutTiming={200}
                useNativeDriver
                ref={() => this.props.setRef(this)}
                {...others}
            >
                <ViewGradient
                    gradientStyle={[
                        styles.modalGradient,
                        gradientStyle,
                    ]}
                    viewStyle={[
                        styles.modalGradient,
                        viewStyle,
                    ]}
                    onlyBorder
                    top
                    left
                    right
                    {...others}
                >
                    {/* {
                        isSetBG
                            ? (
                                <CommonBG
                                    style={[
                                        {
                                            flex: 0,
                                        },
                                        bgStyle
                                    ]}
                                >
                                    {children}
                                </CommonBG>
                            ) : children
                    } */}
                    {children}
                </ViewGradient>
            </Modal>
        )
    }
}
/* 

                    {
                        isSetBG
                            ? (
                                <CommonBG
                                    style={{
                                        flex: 0,
                                    }}
                                >
                                    {children}
                                </CommonBG>
                            ) : children
                    }
*/

function mapStateToProps(state) {
    const currentTrack = state.player.currentTrack;

    return { currentTrack: currentTrack };
}

export default connect(mapStateToProps)(MyModal);