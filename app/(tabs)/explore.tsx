import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { 
  FlatList,
  ImageBackground, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

interface Wine {
  id: string;
  name: string;
  type: string;
  year: number;
  region: string;
  description: string;
  imageUrl: string;
  price: string;
}

const winesData: Wine[] = [
  {
    id: '1',
    name: 'Cabernet Sauvignon Reserve',
    type: 'Tinto',
    year: 2019,
    region: 'Vale dos Vinhedos',
    description: 'Um vinho encorpado com notas de frutas vermelhas e especiarias.',
    imageUrl: 'https://images.unsplash.com/photo-1561461056-77634126673a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 'R$ 89,90'
  },
  {
    id: '2',
    name: 'Chardonnay Premium',
    type: 'Branco',
    year: 2020,
    region: 'Serra Gaúcha',
    description: 'Vinho branco fresco com aromas cítricos e toque amadeirado.',
    imageUrl: 'https://images.unsplash.com/photo-1610458034932-dc165f29499e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 'R$ 65,90'
  },
  {
    id: '3',
    name: 'Merlot Clássico',
    type: 'Tinto',
    year: 2018,
    region: 'Campanha Gaúcha',
    description: 'Merlot suave com taninos macios e final prolongado.',
    imageUrl: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: 'R$ 72,90'
  },
  {
    id: '4',
    name: 'Rosé Especial',
    type: 'Rosé',
    year: 2021,
    region: 'Vale dos Vinhedos',
    description: 'Rosé delicado com notas florais e frutadas.',
    imageUrl: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    price: 'R$ 58,90'
  },
];

export default function CatalogScreen() {
  const renderWineItem = ({ item }: { item: Wine }) => (
    <TouchableOpacity style={styles.cartaoVinho}>
      <ImageBackground
        source={{ uri: item.imageUrl }}
        style={styles.imagemVinho}
        resizeMode="cover"
      >
        <View style={styles.sobreposicaoImagem}>
          <View style={styles.etiquetaTipo}>
            <Text style={styles.textoTipo}>{item.type}</Text>
          </View>
        </View>
      </ImageBackground>
      
      <View style={styles.informacoesVinho}>
        <Text style={styles.nomeVinho}>{item.name}</Text>
        <Text style={styles.anoVinho}>{item.year} • {item.region}</Text>
        <Text style={styles.descricaoVinho}>{item.description}</Text>
        
        <View style={styles.containerPreco}>
          <Text style={styles.preco}>{item.price}</Text>
          <TouchableOpacity style={styles.botaoFavorito}>
            <Ionicons name="heart-outline" size={20} color="#7B1E3A" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.tituloCabecalho}>Catálogo de Vinhos</Text>
        <Text style={styles.subtituloCabecalho}>
          Descubra nossa seleção exclusiva
        </Text>
        
        <View style={styles.containerFiltros}>
          <TouchableOpacity style={styles.botaoFiltro}>
            <Ionicons name="filter" size={16} color="#7B1E3A" />
            <Text style={styles.textoFiltro}>Filtros</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.botaoFiltro}>
            <Ionicons name="search" size={16} color="#7B1E3A" />
            <Text style={styles.textoFiltro}>Buscar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={winesData}
        renderItem={renderWineItem}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudoLista}
      />
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
  },
  tituloCabecalho: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtituloCabecalho: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  containerFiltros: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoFiltro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textoFiltro: {
    marginLeft: 6,
    color: '#7B1E3A',
    fontWeight: '500',
  },
  lista: {
    flex: 1,
  },
  conteudoLista: {
    padding: 20,
  },
  cartaoVinho: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  imagemVinho: {
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 15,
  },
  sobreposicaoImagem: {
    alignItems: 'flex-end',
  },
  etiquetaTipo: {
    backgroundColor: 'rgba(123, 30, 58, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textoTipo: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  informacoesVinho: {
    padding: 20,
  },
  nomeVinho: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  anoVinho: {
    fontSize: 14,
    color: '#7B1E3A',
    fontWeight: '500',
    marginBottom: 8,
  },
  descricaoVinho: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  containerPreco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1E3A',
  },
  botaoFavorito: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8DC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
});