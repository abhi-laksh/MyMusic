import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { withTheme } from "../globals/ThemeProvider";
import { connect } from "react-redux";
import ViewGradient from "./ViewGradient";
import Modal from "react-native-modal";
const styles = StyleSheet.create({
    modal: {
        justifyContent: "flex-end",
        margin: 0
    },
    modalGradient: {
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
})


class MyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        // this.makeVisible = this.makeVisible.bind(this);
        // this.makeInVisible = this.makeInVisible.bind(this);
        // this.props.setRef(this);
    }

    makeVisible() {
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
        // console.log("MOunted :::::::")
    }
    render() {
        const {
            children,
            style,
            gradientStyle,
            viewStyle,
            isOpen,
            setRef,
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
                    {children}
                </ViewGradient>
            </Modal>
        )
    }
}


function mapStateToProps(state) {
    const currentTrack = state.player.currentTrack;

    return { currentTrack: currentTrack };
}

export default connect(mapStateToProps)(MyModal);