import React from "react";
import { Text, View, ImageBackground, Dimensions, useWindowDimensions, Image } from "react-native";

const img = require('../assets/images/wave-flip.png')


class CommonBG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            imgWidth: null,
            imgHeight: null,
            sHeight: null,
            sWidth: null,

        }
        this.onLayout = this.onLayout.bind(this);
    }

    onLayout(e) {
        const sWidth = Dimensions.get("screen").width;
        const sHeight = Dimensions.get("screen").height;

        const imgWidth = Image.resolveAssetSource(img).width;
        const imgHeight = Image.resolveAssetSource(img).height;

        const { width, height } = e.nativeEvent.layout
        // console.log(
        //     "[width]",
        //     width,

        //     "[sWidth]",
        //     sWidth,

        //     "[imgWidth]",
        //     imgWidth,

        //     "[height]",
        //     height,

        //     "[sHeight]",
        //     sHeight,

        //     "[imgHeight]",
        //     imgHeight,

        //     "[ratio]",
        //     (imgWidth / imgHeight) * 100
        // );


        this.setState(() => ({ width, height, imgWidth, imgHeight, sHeight, sWidth }))
    }

    render() {

        const {
            children,
            theme,
            currentTheme,
            style,
            imageStyle,
            ...others
        } = this.props;

        return (

            <View
                style={[
                    {
                        flex: 1,
                    },
                    style
                ]}
                onLayout={this.onLayout}
            >
                <Image source={img}
                    style={{
                        position: "absolute",
                        left: ((this.state.imgWidth && this.state.imgHeight && this.state.width) ? (parseInt((this.state.imgWidth / this.state.imgHeight) * (this.state.width))) : 0),
                        height: this.state.height,
                        width: this.state.width,
                        opacity: 0.35,
                    }}
                    resizeMode={"contain"}

                />
                {children}
            </View>

        )
    }
}

export default CommonBG;

/*

<ImageBackground
                source={img}
                style={[
                    {
                        flex: 1,
                        overflow: "hidden",
                        // position: 'absolute',
                        //   bottom:0
                    },
                    style
                ]}
                imageStyle={[
                    {
                        opacity: 0.4,
                        // height: "100%",
                        aspectRatio: 1,
                    },
                    imageStyle,
                ]}
                resizeMode={"contain"}
                onLayout={this.onLayout}
                {...others}
            >
                {children}
            </ImageBackground>
*/