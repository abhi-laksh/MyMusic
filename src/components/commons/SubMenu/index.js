import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import FontelloIcon from "../FontelloIcon";
import ModalHandler from "./ModalHandler";
import { withTheme } from "../../globals/ThemeProvider";

const styles = StyleSheet.create({
    modalToggler: {
        justifyContent: "center",
        width: 32,
        alignItems: "center",
        // backgroundColor: "#666"
        height:"100%",
    },
})



class SubMenu extends React.Component {

    constructor(props) {
        super(props);
        this.modal = null;
        this._openModal = this._openModal.bind(this);
        this._setMainModalRef = this._setMainModalRef.bind(this);
    }
    _setMainModalRef(ref) {
        // (ref) => { this.modal = ref }
        this.modal = ref;
    }
    _openModal() {
        this.modal.openMainModel()
    }
    render() {
        const {
            songName = "Unknown Name",
            id,
            currentTheme,
            track,
        } = this.props;
        const color = currentTheme.text.primary; 
        return (
            <View>
                <ModalHandler
                    setRef={this._setMainModalRef}
                    track={track} 
                    id={id}
                    songName={songName}
                />
                <Button
                    style={styles.modalToggler}
                    onPress={this._openModal}
                    underlayColor={"transparent"}
                >
                    <FontelloIcon name="dots" color={color} />
                </Button>
            </View >
        )

    }
}

export default withTheme(SubMenu);