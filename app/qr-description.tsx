import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CarrosselImages, NavigationDots } from "@/components/ui/Carrossel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { SheetUp } from "@/components/ui/BottomSheets";
import { useQRData } from "@/hooks/useApi";

export default function Demonstration() {
    const { QRCode } = useLocalSearchParams();
    const { width: windowWidth } = useWindowDimensions();

    const { data: response, loading, error } = useQRData(QRCode);

    let colection: any = null;

    if (response?.status === 'success' && response.data) {
        [colection] = response.data;
    }

    const handleTryAgain = () => {
        router.replace('/qr-scanner');
    };

    const handleBackPress = () => {
        router.back();
    };

    const handleNewScan = () => {
        router.replace('/qr-scanner');
    };

    const renderHeader = (titulo?: string) => (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackPress}
                activeOpacity={0.7}
            >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <ThemedText style={styles.headerTitle}>
                {titulo ? titulo : 'Detalhes do Item'}
            </ThemedText>
        </View>
    );

    const renderFloatingButton = () => (
        <TouchableOpacity
            style={styles.floatingButton}
            onPress={handleNewScan}
            activeOpacity={0.8}
        >
            <Ionicons name="qr-code" size={28} color="#FFFFFF" />
        </TouchableOpacity>
    );

    const renderInvalidQRCode = () => (
        <ThemedView style={styles.invalidQRContainer}>
            {renderHeader()}
            <View style={styles.invalidQRContent}>
                <View style={styles.iconContainer}>
                    <Ionicons name="qr-code-outline" size={80} color="#D4AF37" />
                    <View style={styles.errorBadge}>
                        <Ionicons name="close-circle" size={32} color="#d32f2f" />
                    </View>
                </View>

                <ThemedText type="title" style={styles.invalidTitle}>
                    QR Code Inválido
                </ThemedText>

                <ThemedText style={styles.invalidMessage}>
                    O QR Code escaneado não é válido ou não foi encontrado em nossa base de dados.
                </ThemedText>

                <TouchableOpacity
                    style={styles.tryAgainButton}
                    onPress={handleTryAgain}
                    activeOpacity={0.8}
                >
                    <Ionicons name="scan-outline" size={24} color="#FFFFFF" style={styles.buttonIcon} />
                    <Text style={styles.tryAgainButtonText}>Tentar Novamente</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </ThemedView>
    );

    const renderLoading = () => (
        <ThemedView style={styles.centerContainer}>
            {renderHeader()}
            <View style={styles.loadingContent}>
                <ActivityIndicator size="large" color="#7B1E3A" />
                <ThemedText style={styles.loadingText}>Carregando informações...</ThemedText>
            </View>
        </ThemedView>
    );

    const renderError = () => (
        <ThemedView style={styles.centerContainer}>
            {renderHeader()}
            <View style={styles.errorContent}>
                <Ionicons name="alert-circle-outline" size={60} color="#d32f2f" />
                <ThemedText style={styles.errorTitle}>Erro de Conexão</ThemedText>
                <ThemedText style={styles.errorMessage}>
                    {error || 'Não foi possível carregar as informações'}
                </ThemedText>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={handleTryAgain}
                    activeOpacity={0.8}
                >
                    <Ionicons name="refresh-outline" size={20} color="#7B1E3A" />
                    <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );

    return (
        <SafeAreaProvider>
            <StatusBar barStyle="light-content" backgroundColor="#7B1E3A" translucent={false} />
            <SafeAreaView style={[styles.container]} edges={['top']}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    {loading && renderLoading()}

                    {error && renderError()}

                    {response?.status === 'error' && !loading && renderInvalidQRCode()}

                    {colection && !loading && (
                        <>
                            {renderHeader(colection.nome_item)}
                            <View style={{ position: "relative", backgroundColor: '#FFFFFF', flex: 1 }}>
                                <View style={{ position: "relative" }}>
                                    <CarrosselImages images={colection.images} width={windowWidth} height={60} heightPercentage={true} />
                                    <View style={styles.navigationDotsContainer}>
                                        <NavigationDots images={colection.images} />
                                    </View>
                                </View>

                                <SheetUp
                                    SheetOverDrag={10}
                                    SetPosY={58}
                                    SheetHeight={1300}
                                    Percentage={true}
                                    Close={false}
                                    description={colection.descricao}
                                    floatingButton={renderFloatingButton()}
                                />
                            </View>
                        </>
                    )}
                </GestureHandlerRootView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7B1E3A',
    },
    // Header styles
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#7B1E3A',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 1000,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1,
        marginHorizontal: 15,
    },
    scanButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Floating button styles
    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#7B1E3A',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#7B1E3A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    navigationDotsContainer: {
        top: 35,
        padding: 3,
        width:'25%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.38)",
        alignSelf: "center",
        borderRadius: 10,
    },

    centerContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 0,
    },
    // Loading styles
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 30,
        marginTop: -60,
    },
    loadingText: {
        fontSize: 18,
        color: '#7B1E3A',
        fontWeight: '600',
        textAlign: 'center',
    },
    // Error styles
    errorContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        gap: 20,
        marginTop: -60,
    },
    errorTitle: {
        fontSize: 24,
        color: '#7B1E3A',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    errorMessage: {
        fontSize: 16,
        color: '#4A4A4A',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    retryButton: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#7B1E3A',
        marginTop: 20,
        gap: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    retryButtonText: {
        color: '#7B1E3A',
        fontSize: 16,
        fontWeight: '600',
    },
    // Invalid QR Code styles
    invalidQRContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 0, // Remove margem para começar logo após o header
    },
    invalidQRContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        gap: 25,
        marginTop: -60, // Ajuste para compensar o header
    },
    iconContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 2,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    invalidTitle: {
        fontSize: 28,
        color: '#7B1E3A',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    invalidMessage: {
        fontSize: 16,
        color: '#4A4A4A',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    tryAgainButton: {
        backgroundColor: '#7B1E3A',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        paddingHorizontal: 30,
        borderRadius: 15,
        marginTop: 20,
        elevation: 4,
        shadowColor: '#7B1E3A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        minWidth: 250,
    },
    tryAgainButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        marginLeft: 10,
    },
    buttonIcon: {
        marginRight: 5,
    },
})