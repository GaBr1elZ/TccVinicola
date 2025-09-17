import React from "react";
import {
    Animated,
    ImageBackground,
    ScrollView,
    Text,
    useAnimatedValue,
    useWindowDimensions,
    View
} from "react-native";

var scrollX = useAnimatedValue(0)
const { width: windowWidth } = useWindowDimensions();

export function Carrossel({ images, width, height }: CarrosselProps) {

    return (
        <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ])}
            scrollEventThrottle={1}>
            {images.map((image, imageIndex) => {
                return (
                    <View
                        style={{ width: width, height: height, backgroundColor: image.color }}
                        key={imageIndex}>
                        <Text style={styles.title}>{image.title}</Text>
                    </View>
                );
            })}
        </ScrollView>
    )
}

export function CarrosselImages({ images, width, height }: CarrosselImagesProps) {

    return (
        <ScrollView
            style={{ width: width, height: height }}
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ])}
            scrollEventThrottle={1}>
            {images.map((source, index) => {
                return (
                    <ImageBackground
                        source={{ uri: source }}
                        style={{ width: width, height: height }}
                        key={index}>
                    </ImageBackground>
                )
            })}
        </ScrollView>
    )
};

export function NavigationDots({ images }: DotsProps) {

    const dots = images.map((image, imageIndex) => {
        const width = scrollX.interpolate({
            inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
            ],
            outputRange: [8, 24, 8],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
            />
        );
    })

    return (dots)
}

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    scrollContainer: {
        width: 400,
        borderRadius: 16,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: 'silver',
        marginHorizontal: 4,
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#000',
        fontSize: 24,
    }
});

type CarrosselProps = {
    images: any[];
    width: number;
    height: number;
};

type DotsProps = {
    images: Array<{
        title: string,
        color: string,
    }>;
}

type CarrosselImagesProps = {
    images: any[];
    width: number;
    height: number;
}
