import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function QRScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [flashOn, setFlashOn] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    setTimeout(() => {
      setHasPermission(true);
    }, 1000);
  };

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    Alert.alert(
      'QR Code Detectado!',
      `Dados: ${data}`,
      [
        {
          text: 'Escanear Novamente',
          onPress: () => console.log('Continuar escaneando'),
        },
        {
          text: 'Ver Produto',
          onPress: () => {
            router.push('/(tabs)');
          },
        },
      ]
    );
  };

  const simulateQRScan = () => {
    const mockQRData = 'vinho_premium_2019_cabernet_sauvignon';
    handleBarCodeScanned({ data: mockQRData });
  };

  const handleBack = () => {
    router.back();
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#8B4513" />
        <Ionicons name="camera" size={60} color="#7B1E3A" />
        <Text style={styles.permissionText}>Solicitando permissão da câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#8B4513" />
        <Ionicons name="videocam-off" size={60} color="#7B1E3A" />
        <Text style={styles.permissionText}>
          Permissão da câmera negada. Por favor, habilite nas configurações.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escanear QR Code</Text>
        <TouchableOpacity 
          style={styles.flashButton} 
          onPress={toggleFlash}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={flashOn ? "flash" : "flash-off"} 
            size={24} 
            color="#ffffff" 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraContainer}>
        <View style={styles.cameraPlaceholder}>
          <Ionicons name="camera" size={80} color="#7B1E3A" />
          <Text style={styles.cameraText}>Área da Câmera</Text>
          <Text style={styles.cameraSubtext}>
            Posicione o QR code dentro do quadrado
          </Text>
        </View>

        <View style={styles.scanFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Como usar:</Text>
        <Text style={styles.instructionsText}>
          • Aponte a câmera para o QR{'\n'}
          • Mantenha o código dentro da área marcada{'\n'}
          • O escaneamento é automático
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.testButton} 
          onPress={simulateQRScan}
          activeOpacity={0.8}
        >
          <Text style={styles.testButtonText}>Continuar Escaneamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
  },
  permissionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#4A4A4A',
    marginTop: 20,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(123, 30, 58, 0.9)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  flashButton: {
    padding: 8,
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholder: {
    alignItems: 'center',
    opacity: 0.7,
  },
  cameraText: {
    color: '#7B1E3A',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  cameraSubtext: {
    color: '#4A4A4A',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  scanFrame: {
    position: 'absolute',
    width: 250,
    height: 250,
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#D4AF37',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  instructionsContainer: {
    backgroundColor: 'rgba(123, 30, 58, 0.9)',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  instructionsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  instructionsText: {
    color: '#D4AF37',
    fontSize: 14,
    lineHeight: 20,
  },
  bottomContainer: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: 'rgba(123, 30, 58, 0.9)',
  },
  button: {
    backgroundColor: '#7B1E3A',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  testButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#4A4A4A',
    fontSize: 16,
    fontWeight: '600',
  },
});
