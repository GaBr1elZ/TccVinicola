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
const { width: windowWidth, height: windowHeight } = useWindowDimensions();

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

export function CarrosselImages({ images, width, height, heightPercentage = false }: CarrosselImagesProps) {
    if (heightPercentage) {
        height = windowHeight * (height / 100);
        console.log('New Height:', height);
    }
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
        const flex = scrollX.interpolate({
            inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
            ],
            outputRange: [1, 3, 1],
            extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
            inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { flex, opacity }]}
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
        flex: 1,
        height: 3,
        borderRadius: 4,
        backgroundColor: '#f5f5f5ff',
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
    heightPercentage?: boolean;
}
