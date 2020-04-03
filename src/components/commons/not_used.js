import React from 'react';
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
            main: "#f79546",
            dark: "",
        },
        secondary: {
            main: "#8a64ab",
            dark: "",
        },
        success: {
            main: "",
            dark: "",
        },
        error: {
            main: "",
            dark: "",
        },
    },
    light: {
        text: {
            primary: "#222",
            secondary: "#333",
            disabled: "rgba(5,5,5,0.5)",
        },
        background: "#fff",
    },
    dark: {
        text: {
            primary: "#fff",
            secondary: "#ccc",
            disabled: "rgba(255,255,255,0.5)",
        },
        background: "#000",
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
    hexToRGB: function (hex, alpha) {
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

const ThemeContext = React.createContext({
    theme: { theme },
});

export const ThemeContextProvider = ({ children }) => {
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};
