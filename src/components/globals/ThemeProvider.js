import React, { useContext } from 'react';
export const theme = {
    font: {
        montserrat: {
            thin: "Montserrat-Thin",
            extraLight: "Montserrat-ExtraLight",
            extraLightItalic: "Montserrat-ExtraLightItalic",
            light: "Montserrat-Light",
            regular: "Montserrat-Regular",
            italic: "Montserrat-Italic",
            black: "Montserrat-Black",
            extraBold: "Montserrat-ExtraBold",
            bold: "Montserrat-Bold",
            medium: "Montserrat-Medium",
            mediumItalic: "Montserrat-MediumItalic",
            semiBold: "Montserrat-SemiBold",
            semiBoldItalic: "Montserrat-SemiBoldItalic",
        },
        bellota: {
            light: "Bellota-Light",
            lightItalic: "Bellota-LightItalic",
            regular: "Bellota-Regular",
            italic: "Bellota-Italic",
            bold: "Bellota-Bold",
            boldItalic: "Bellota-BoldItalic",
        },
        default: {
            fontFamily: "Montserrat-Regular",
            fontSize: 16,
            lineHeight: (16 * 1.5)
        },
    },
    pallete: {
        common: {
            black: "#000",
            white: "#fff",
        },
        primary: {
            light: "#ffab40",
            main: "#ff9100",
            dark: "#ff6d00",
        },
        secondary: {
            light: "#7e57c2",
            main: "#651fff",
            dark: "#311b92",
        },
        success: {
            main: "#00e676",
        },
        error: {
            main: "#e53935",
        },
    },
    light: {
        name: "light",
        text: {
            primary: "#222f3e",
            secondary: "#1e272e",
            disabled: "rgba(5,5,5,0.5)",
        },
        background: "#fff",
    },
    dark: {
        name: "dark",
        text: {
            primary: "#fff",
            secondary: "#ccc",
            disabled: "rgba(255,255,255,0.5)",
        },
        background: "#090214",
    },
    getFontSettings: function (fontName, variant = "regular", size = 16) {
        const fontFamily = this.font[fontName];

        if (typeof fontFamily === "undefined") { console.warn(`Can't find font family : '${fontName}'`); return; }

        const validate = fontFamily[variant];

        if (typeof validate === "undefined") { console.warn(`Can't find font variant : '${variant}' for '${fontName}' \nChoose one of :\n${Object.keys(fontFamily).join("\n")}`); return; }

        const fontStyles = {
            fontFamily: this.font[fontName][variant],
            fontSize: size,
            lineHeight: (size * 1.5),
        }
        return fontStyles;
    },
    hexToRGB: function (hex, alpha = 1) {
        hex = hex.replace('#', '');
        var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
        var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
        var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
        if (alpha) {
            return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
        }
        else {
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        }
    },
    lightenDarken: (p, c) => {
        var i = parseInt, r = Math.round, [a, b, c, d] = c.split(","), P = p < 0, t = P ? 0 : 255 * p, P = P ? 1 + p : 1 - p;
        return "rgb" + (d ? "a(" : "(") + r(i(a[3] == "a" ? a.slice(5) : a.slice(4)) * P + t) + "," + r(i(b) * P + t) + "," + r(i(c) * P + t) + (d ? "," + d : ")");
    }
}

export const ThemeContext = React.createContext({
    currentTheme: theme.light,
    theme: theme,
    // toggleTheme: () => { },
});

export function withTheme(Component) {
    return props => {
        const { theme, currentTheme, toggleTheme } = useContext(ThemeContext);
        return <Component {...props} theme={theme} currentTheme={currentTheme}  toggleTheme={toggleTheme} />
    }
}
