import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { 
  ImageBackground, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

export default function HomeScreen() {
  const handleScanQR = () => {
    router.push('/qr-scanner');
  };

  const handleExploreWines = () => {
    router.push('/explore');
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ 
          uri: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' 
        }}
        style={styles.fundoCabecalho}
        resizeMode="cover"
      >
        <View style={styles.sobreposicaoCabecalho} />
        <View style={styles.conteudoCabecalho}>
          <Text style={styles.tituloBemVindo}>Bem-vindo à TCC Vinícola</Text>
          <Text style={styles.subtituloBemVindo}>
            Descubra a história por trás de cada garrafa
          </Text>
        </View>
      </ImageBackground>

      {/* Conteúdo principal */}
      <View style={styles.containerConteudo}>
        <View style={styles.containerAcoes}>
          <TouchableOpacity style={styles.cartaoAcao} onPress={handleScanQR}>
            <View style={styles.containerIconeAcao}>
              <Ionicons name="qr-code-outline" size={40} color="#7B1E3A" />
            </View>
            <Text style={styles.tituloAcao}>Escanear QR Code</Text>
            <Text style={styles.descricaoAcao}>
              Escaneie o código QR para descobrir sua história
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cartaoAcao} onPress={handleExploreWines}>
            <View style={styles.containerIconeAcao}>
              <Ionicons name="wine" size={40} color="#7B1E3A" />
            </View>
            <Text style={styles.tituloAcao}>Explorar Vinhos</Text>
            <Text style={styles.descricaoAcao}>
              Navegue pela nossa coleção de vinhos selecionados
            </Text>
          </TouchableOpacity>
        </View>

        {/* Seção de destaque */}
        <View style={styles.secaoDestaque}>
          <Text style={styles.tituloSecao}>Em Destaque</Text>
          
          <View style={styles.cartaoDestaque}>
            <ImageBackground
              source={{ 
                uri: 'https://images.unsplash.com/photo-1561461056-77634126673a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
              }}
              style={styles.imagemDestaque}
              resizeMode="cover"
            >
              <View style={styles.sobreposicaoDestaque}>
                <Text style={styles.tituloDestaque}>Vinho Tinto Premium</Text>
                <Text style={styles.subtituloDestaque}>
                  Safra especial 2018 - Edição limitada
                </Text>
              </View>
            </ImageBackground>
          </View>
        </View>

        {/* Seção sobre a vinícola */}
        <View style={styles.secaoSobre}>
          <Text style={styles.tituloSecao}>Sobre Nossa Vinícola</Text>
          <Text style={styles.textoSobre}>
            Com mais de 50 anos de tradição, a TCC Vinícola combina técnicas 
            tradicionais com tecnologia moderna para criar vinhos únicos que 
            contam a história de nossa terra e paixão.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fundoCabecalho: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sobreposicaoCabecalho: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  conteudoCabecalho: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tituloBemVindo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtituloBemVindo: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  containerConteudo: {
    flex: 1,
    padding: 20,
  },
  containerAcoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 15,
  },
  cartaoAcao: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  containerIconeAcao: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF8DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  tituloAcao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  descricaoAcao: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  secaoDestaque: {
    marginBottom: 30,
  },
  tituloSecao: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  cartaoDestaque: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 200,
  },
  imagemDestaque: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sobreposicaoDestaque: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  tituloDestaque: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtituloDestaque: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  secaoSobre: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 20,
  },
  textoSobre: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});
