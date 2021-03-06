import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import MyAppText from "../../commons/MyAppText";
import ViewGradient from "../../commons/ViewGradient";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/Button";
import HeaderLayout from "../../commons/HeaderLayout";



const styles = StyleSheet.create({
    parentView: {
        padding: 0,
        flexDirection: "row",
        paddingVertical: 8,
    },
    buttons: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    capital: {
        textTransform: "capitalize"
    },
    parentSongName: {
        flex: 1,
        alignItems: "center",
    },
})
function Header(props) {

    const { currentTheme, navigation, scene } = props;
    
    const color = currentTheme.text.primary;

    return (
        <HeaderLayout>
            <ViewGradient
                viewStyle={styles.parentView}
                onlyBorder
                bottom
                borderWidth={1}
            >
                <Button
                    style={[
                        styles.buttons,
                        {
                            backgroundColor: currentTheme.background,
                        },
                    ]}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="chevron-left" size={30} color={color} />
                </Button>

                <MyAppText
                    style={styles.capital}
                    parentStyle={styles.parentSongName}
                    variant="semiBold"
                    numberOfLines={1}
                >
                    Favourites
                </MyAppText>

            </ViewGradient>
        </HeaderLayout >
    );
}

export default withTheme(Header);