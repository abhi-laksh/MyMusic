import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import FontelloIcon from "../../commons/FontelloIcon";
import ViewGradient from "../../commons/ViewGradient";
import { withTheme } from "../../globals/ThemeProvider";
import Button from "../../commons/Button";
import HeaderLayout from "../../commons/HeaderLayout";

const styles = StyleSheet.create({
    gradientViewStyle: {
        padding: 0,
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    menuToggleButton: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
    },
    searchParent: {
        flex: 1,

        height: 36,
        borderRadius: 6,
        overflow: "hidden",
        flexDirection: "row"
    },
    searchBox: {
        paddingHorizontal: 8,
        flex: 1,
    },
    searchButton: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    menuToggleButton: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
    },
    menuToggleButton: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
    }
})
function Header(props) {
    const { theme, currentTheme, navigation } = props;
    const contrastValue = (theme.dark.background === currentTheme.background) ? 0.25 : -0.1;
    const contrast = theme.lightenDarken(contrastValue, theme.hexToRGB(currentTheme.background));
    const themeColor = currentTheme.name === "dark" ? theme.pallete.primary.main : theme.pallete.primary.light
    const currentColor = currentTheme.text.primary;
    // const navigation = useNavigation();

    return (
        <HeaderLayout>
            <ViewGradient
                viewStyle={styles.gradientViewStyle}
                onlyBorder
                bottom
                borderWidth={1}
            >
                <Button
                    style={styles.menuToggleButton}
                    onPress={() => navigation.toggleDrawer()}
                    // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    underlayColor={currentTheme.background}
                >
                    <FontelloIcon name="align-left-1" size={18} color={currentColor} />
                </Button>
                <View
                    style={[
                        styles.searchParent,
                        { backgroundColor: contrast, }
                    ]}
                >
                    <TextInput
                        style={[
                            styles.searchBox,
                            {
                                color: currentColor,
                            }
                        ]}
                        selectionColor={themeColor}
                        returnKeyType="search"
                    />
                    <Button
                        style={styles.searchButton}
                        onPress={() => console.log("Hii")}
                        underlayColor={"transparent"}
                    >
                        <FontelloIcon name="search" size={16} color={currentColor} />
                    </Button>
                </View>
            </ViewGradient>
        </HeaderLayout >
    );
}

export default withTheme(Header);