import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

export default function ScannerScreen() {
  const handleScanQR = () => {
    router.push('/qr-scanner');
  };

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.tituloCabecalho}>Scanner QR Code</Text>
        <Text style={styles.subtituloCabecalho}>
          Escaneie o código QR da garrafa para descobrir sua história
        </Text>
      </View>

      <View style={styles.conteudo}>
        <View style={styles.containerScanner}>
          <View style={styles.containerIconeQR}>
            <Ionicons name="qr-code-outline" size={120} color="#7B1E3A" />
          </View>
          
          <Text style={styles.tituloInstrucoes}>Como escanear:</Text>
          <View style={styles.listaInstrucoes}>
            <View style={styles.itemInstrucao}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.textoInstrucao}>
                Posicione o código QR dentro do quadro
              </Text>
            </View>
            <View style={styles.itemInstrucao}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.textoInstrucao}>
                Mantenha o celular estável
              </Text>
            </View>
            <View style={styles.itemInstrucao}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.textoInstrucao}>
                Aguarde o reconhecimento automático
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.botaoScan} onPress={handleScanQR}>
          <Ionicons name="camera" size={24} color="#fff" />
          <Text style={styles.textoBotaoScan}>Iniciar Scanner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cabecalho: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  },
  tituloCabecalho: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtituloCabecalho: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  conteudo: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  containerScanner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerIconeQR: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#FFF8DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 3,
    borderColor: '#7B1E3A',
    borderStyle: 'dashed',
  },
  tituloInstrucoes: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  listaInstrucoes: {
    alignItems: 'flex-start',
  },
  itemInstrucao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  textoInstrucao: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  botaoScan: {
    backgroundColor: '#7B1E3A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  textoBotaoScan: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});