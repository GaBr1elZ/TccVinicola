import React, { useState } from "react"
import { StyleSheet, useWindowDimensions, View } from "react-native"

import { CarrosselImages, NavigationDots } from "@/components/ui/Carrossel"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

import { SheetUp } from "@/components/ui/BottomSheets"
import { useEffect } from "react"

function useDescription(QRCode: string) {
    const URL = `http://10.0.1.135:3333/qr-info/${QRCode}`;
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(URL, {
                    method: 'GET',
                });
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [QRCode]);

    return data;
}

export default function Demonstration() {

    const { width: windowWidth } = useWindowDimensions();

    var response = useDescription('QR002');
    var colection: any = null;

    if (response) {
        [colection] = response.data;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container]}>
                <GestureHandlerRootView>
                    {response ? 

                    <View style={{position: "relative"}}>
                        <CarrosselImages images={colection.images} width={windowWidth} height={400} />
                        <View style={styles.navigationDotsContainer}>
                            <NavigationDots images={colection.images} />
                        </View>
                    </View> 

                    : null}
                    {response ? <SheetUp SheetOverDrag={10} SetPosY={35} SheetHeight={1300} Percentage={true} Close={false} description={colection.descricao}></SheetUp> : null}
                </GestureHandlerRootView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        flex: 1,
        justifyContent: 'center',
    },
    navigationDotsContainer:{
        bottom: 35,
        padding: 3,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        position: "absolute",
        backgroundColor: "#0000005f",
        alignSelf: "center",
        borderRadius: 10,
    }
})