import { useLocalSearchParams } from "expo-router"
import React, { useEffect, useState } from "react"
import { StyleSheet, useWindowDimensions, View } from "react-native"

import { CarrosselImages, NavigationDots } from "@/components/ui/Carrossel"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

import { SheetUp } from "@/components/ui/BottomSheets"

function useDescription(QRCode: string | string[]) {
    const URL = `http://192.168.1.15:3333/qr-info/${QRCode}`;
    const [data, setData] = useState<any>(null);

    console.log("Buscando dados para o QRCode:", QRCode);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("URL:", URL);
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log("Dados recebidos da API:", result);
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
    const { QRCode } = useLocalSearchParams();

    const { width: windowWidth } = useWindowDimensions();

    var response = useDescription(QRCode);
    var colection: any = null;

    if (response) {
        [colection] = response.data;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[styles.container]}>
                <GestureHandlerRootView>
                    {response ?

                        <View style={{ position: "relative" }}>
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
    navigationDotsContainer: {
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