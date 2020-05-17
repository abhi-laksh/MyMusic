import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyAppText from '../../commons/MyAppText';
import ViewGradient from '../../commons/ViewGradient';
const InfoRow = ({ currentTheme, contrast, label, children, ...props }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                marginVertical: 8,
            }}
        >
            <MyAppText
                parentStyle={{
                    paddingVertical: 10,
                    paddingHorizontal: 0,
                    // backgroundColor: "#666",
                    flex: 0.3,
                }}
                style={{
                    // flex: 0,
                    textTransform: "capitalize",
                }}
                size={15}
                color={contrast}
                variant={"semiBold"}
            >
                {label}
            </MyAppText>
            {children}
            {/* <ViewGradient
                gradientStyle={{
                    // backgroundColor: "#444",
                    flex: 1,
                    // marginLeft: 24,
                }}
                viewStyle={{
                    // padding: 0,
                    // flex: 1,
                    // paddingVertical: 20,
                    // backgroundColor: "#444",
                    // justifyContent: "center",
                }}
                onlyBorder
                borderWidth={1}
                // bottom
            >
                
            </ViewGradient> */}
        </View>
    );
};

export default InfoRow;