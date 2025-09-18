import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const handleContinueWithoutLogin = () => {
    router.push('/(tabs)');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleScanQRCode = () => {
    router.push('/qr-scanner');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#7B1E3A" />

      <ImageBackground
        source={{ uri: 'https://assets.gqindia.com/photos/684a9d18e8d73f33c3d3fb3f/16:9/w_2560%2Cc_limit/how-long-does-an-open-bottle-of-wine-last.jpg' }}
        style={styles.headerBackground}
        resizeMode="cover"
      >
        <View style={styles.headerOverlay} />
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Ionicons 
              name="wine" 
              size={60} 
              color="#D4AF37" 
              style={styles.wineGlassIcon}
            />
          </View>
          <Text style={styles.brandName}>Vinícola</Text>
        </View>
      </ImageBackground>

      <View style={styles.whiteContainer}>
        <View style={styles.contentSection}>
          
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Bem-vindo!</Text>
            <Text style={styles.welcomeSubtitle}>
              Explore e descubra a história por trás de cada garrafa
            </Text>
          </View>
          
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Ionicons name="person-circle" size={24} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.primaryButtonText}>Fazer Login</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={handleScanQRCode}
              activeOpacity={0.8}
            >
              <View style={styles.qrIconContainer}>
                <Ionicons name="qr-code-outline" size={22} color="#7B1E3A" />
              </View>
              <Text style={styles.secondaryButtonText}>Escanear QR Code</Text>
              <Ionicons name="arrow-forward" size={18} color="#7B1E3A" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.tertiaryButton} 
              onPress={handleContinueWithoutLogin}
              activeOpacity={0.7}
            >
              <Text style={styles.tertiaryButtonText}>Explorar sem conta</Text>
              <Ionicons name="arrow-forward-outline" size={16} color="#D4AF37" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B1E3A',
  },
  headerBackground: {
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
    position: 'relative',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(123, 30, 58, 0.8)',
  },
  logoSection: {
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    backgroundColor: 'rgba(212, 175, 55, 0.25)',
    borderRadius: 40,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'rgba(212, 175, 55, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  wineGlassIcon: {
    transform: [{ rotate: '-15deg' }],
  },
  brandName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: '#D4AF37',
    fontStyle: 'italic',
    opacity: 0.9,
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7B1E3A',
    marginBottom: 12,
    marginTop: 20,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#4A4A4A',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    marginTop: 80,
    gap: 20,
    marginBottom: 0,
  },
  primaryButton: {
    backgroundColor: '#7B1E3A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#7B1E3A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#D4AF37',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.4)',
    gap: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  secondaryButtonText: {
    color: '#7B1E3A',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
  },
  tertiaryButtonText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '500',
  },
  qrIconContainer: {
    backgroundColor: 'rgba(212, 175, 55, 0.2)',
    borderRadius: 10,
    padding: 8,
  },
  footerSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
});
