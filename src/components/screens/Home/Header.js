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
        flex: 0,
    },
    searchParent: {
        flex: 1,
        height: 36,
        borderRadius: 6,
        overflow: "hidden",
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
                    <FontelloIcon name="forwardburger" size={20} color={currentColor} />
                </Button>

                <View
                    style={[
                        styles.searchParent,
                    ]}
                >
                    <Button
                        style={{
                            // backgroundColor: "#666",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            backgroundColor: contrast,
                        }}
                        onPress={() => { navigation.navigate("Search") }}
                        underlayColor={contrast}
                        activeOpacity={0.6}
                    >
                        <View
                            style={styles.searchButton}
                        >
                            <FontelloIcon name="search" size={16} color={currentColor} />
                        </View>
                    </Button>
                </View>
            </ViewGradient>
        </HeaderLayout>
    );
}

export default withTheme(Header);