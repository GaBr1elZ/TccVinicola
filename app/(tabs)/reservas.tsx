import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import apiService from '../../services/apiService';

interface DadosReserva {
  nomeCliente: string;
  emailCliente: string;
  telefoneCliente: string;
  dataVisita: string;
  horarioVisita: string;
  numeroVisitantes: string;
  tipoTour: string;
  observacoes: string;
}

const tiposTours = [
  { id: 'basico', nome: 'Tour Básico', descricao: 'Visita às instalações', preco: 'R$ 25,00' },
  { id: 'premium', nome: 'Tour Premium', descricao: 'Visita + degustação de 3 vinhos', preco: 'R$ 45,00' },
  { id: 'exclusivo', nome: 'Tour Exclusivo', descricao: 'Visita + degustação premium + jantar', preco: 'R$ 120,00' }
];

const horariosDisponiveis = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
];

export default function ReservasScreen() {
  const [dadosReserva, setDadosReserva] = useState<DadosReserva>({
    nomeCliente: '',
    emailCliente: '',
    telefoneCliente: '',
    dataVisita: '',
    horarioVisita: '',
    numeroVisitantes: '1',
    tipoTour: '',
    observacoes: ''
  });
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setUserId(1);
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const atualizarCampo = (campo: keyof DadosReserva, valor: string) => {
    if (campo === 'dataVisita') {
      let apenasNumeros = valor.replace(/\D/g, '');
      apenasNumeros = apenasNumeros.substring(0, 8);
      
      let dataFormatada = apenasNumeros;
      if (apenasNumeros.length > 2) {
        dataFormatada = apenasNumeros.substring(0, 2) + '/' + apenasNumeros.substring(2);
      }
      if (apenasNumeros.length > 4) {
        dataFormatada = apenasNumeros.substring(0, 2) + '/' + 
                        apenasNumeros.substring(2, 4) + '/' + 
                        apenasNumeros.substring(4);
      }
      
      valor = dataFormatada;
    }
    
    setDadosReserva(prevState => ({
      ...prevState,
      [campo]: valor
    }));
  };

  const validarFormulario = (): boolean => {
    if (!dadosReserva.nomeCliente.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu nome.');
      return false;
    }
    if (!dadosReserva.emailCliente.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu email.');
      return false;
    }
    if (!dadosReserva.telefoneCliente.trim()) {
      Alert.alert('Erro', 'Por favor, informe seu telefone.');
      return false;
    }
    if (!dadosReserva.dataVisita.trim()) {
      Alert.alert('Erro', 'Por favor, selecione a data da visita.');
      return false;
    }
    
    const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const dataMatch = dadosReserva.dataVisita.match(dataRegex);
    
    if (!dataMatch) {
      Alert.alert('Erro', 'Data inválida. Use o formato DD/MM/AAAA (ex: 23/10/2025).');
      return false;
    }
    
    const [, dia, mes, ano] = dataMatch;
    const diaNum = parseInt(dia);
    const mesNum = parseInt(mes);
    const anoNum = parseInt(ano);
    
    if (diaNum < 1 || diaNum > 31 || mesNum < 1 || mesNum > 12 || anoNum < 2025) {
      Alert.alert('Erro', 'Data inválida. Verifique o dia, mês e ano.');
      return false;
    }
    
    const dataVisita = new Date(anoNum, mesNum - 1, diaNum);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    if (dataVisita < hoje) {
      Alert.alert('Erro', 'A data da visita não pode estar no passado.');
      return false;
    }
    
    if (!dadosReserva.horarioVisita.trim()) {
      Alert.alert('Erro', 'Por favor, selecione o horário da visita.');
      return false;
    }
    if (!dadosReserva.tipoTour.trim()) {
      Alert.alert('Erro', 'Por favor, selecione o tipo de tour.');
      return false;
    }
    return true;
  };

  const enviarReserva = async () => {
    if (!validarFormulario()) {
      return;
    }

    if (!userId) {
      Alert.alert('Erro', 'Você precisa estar logado para fazer uma reserva.');
      return;
    }

    setIsLoading(true);

    try {
      let dataFormatada = dadosReserva.dataVisita;
      
      if (dadosReserva.dataVisita.includes('/')) {
        const dataParts = dadosReserva.dataVisita.split('/');
        if (dataParts.length === 3) {
          const dia = dataParts[0].padStart(2, '0');
          const mes = dataParts[1].padStart(2, '0');
          const ano = dataParts[2];
          dataFormatada = `${ano}-${mes}-${dia}`;
        }
      }
      else if (dadosReserva.dataVisita.length === 8 && !isNaN(Number(dadosReserva.dataVisita))) {
        const dia = dadosReserva.dataVisita.substring(0, 2);
        const mes = dadosReserva.dataVisita.substring(2, 4);
        const ano = dadosReserva.dataVisita.substring(4, 8);
        dataFormatada = `${ano}-${mes}-${dia}`;
      }

      console.log('Data original:', dadosReserva.dataVisita);
      console.log('Data formatada:', dataFormatada);

      const reservaData = {
        usuario_id: userId,
        nome_cliente: dadosReserva.nomeCliente.trim(),
        email_cliente: dadosReserva.emailCliente.trim(),
        telefone_cliente: dadosReserva.telefoneCliente.trim(),
        data_visita: dataFormatada,
        horario_visita: dadosReserva.horarioVisita,
        numero_visitantes: parseInt(dadosReserva.numeroVisitantes) || 1,
        tipo_tour: dadosReserva.tipoTour,
        observacoes: dadosReserva.observacoes.trim() || undefined
      };

      const response = await apiService.createReservation(reservaData);

      if (response.status === 'success') {
        Alert.alert(
          'Sucesso!', 
          `Reserva criada com sucesso!\n\nCliente: ${dadosReserva.nomeCliente}\nData: ${dadosReserva.dataVisita}\nHorário: ${dadosReserva.horarioVisita}\nTour: ${tiposTours.find(t => t.id === dadosReserva.tipoTour)?.nome}`,
          [
            {
              text: 'OK',
              onPress: () => {
                setDadosReserva({
                  nomeCliente: '',
                  emailCliente: '',
                  telefoneCliente: '',
                  dataVisita: '',
                  horarioVisita: '',
                  numeroVisitantes: '1',
                  tipoTour: '',
                  observacoes: ''
                });
              }
            }
          ]
        );
      } else {
        Alert.alert('Erro', response.message || 'Erro ao criar reserva');
      }
    } catch (error: any) {
      console.error('Erro ao enviar reserva:', error);
      Alert.alert('Erro', error.message || 'Erro ao enviar reserva. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={estilos.containerPrincipal}>
      <View style={estilos.headerSolido}>
        <View style={estilos.cabecalho}>
          <View style={estilos.iconeContainer}>
            <Ionicons name="calendar" size={50} color="white" />
          </View>
          <Text style={estilos.titulo}>Agendar Visita</Text>
          <Text style={estilos.subtitulo}>
            Reserve seu tour pela nossa vinícola e desfrute de uma experiência única!
          </Text>
        </View>
      </View>

      <ScrollView 
        style={estilos.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={estilos.scrollContent}
      >
        <View style={estilos.formulario}>
          <View style={estilos.secaoCard}>
            <View style={estilos.secaoHeader}>
              <Ionicons name="person" size={24} color="#7B1E3A" />
              <Text style={estilos.secaoTitulo}>Dados Pessoais</Text>
            </View>
            
            <View style={estilos.campoModerno}>
              <Text style={estilos.labelModerno}>Nome Completo *</Text>
              <View style={estilos.inputContainer}>
                <Ionicons name="person-outline" size={20} color="#7B1E3A" style={estilos.inputIcon} />
                <TextInput
                  style={estilos.inputModerno}
                  value={dadosReserva.nomeCliente}
                  onChangeText={(texto) => atualizarCampo('nomeCliente', texto)}
                  placeholder="Digite seu nome completo"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={estilos.campoModerno}>
              <Text style={estilos.labelModerno}>Email *</Text>
              <View style={estilos.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#7B1E3A" style={estilos.inputIcon} />
                <TextInput
                  style={estilos.inputModerno}
                  value={dadosReserva.emailCliente}
                  onChangeText={(texto) => atualizarCampo('emailCliente', texto)}
                  placeholder="seu@email.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={estilos.campoModerno}>
              <Text style={estilos.labelModerno}>Telefone *</Text>
              <View style={estilos.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#7B1E3A" style={estilos.inputIcon} />
                <TextInput
                  style={estilos.inputModerno}
                  value={dadosReserva.telefoneCliente}
                  onChangeText={(texto) => atualizarCampo('telefoneCliente', texto)}
                  placeholder="(11) 99999-9999"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>

          {/* Data e Horário */}
          <View style={estilos.secaoCard}>
            <View style={estilos.secaoHeader}>
              <Ionicons name="time" size={24} color="#7B1E3A" />
              <Text style={estilos.secaoTitulo}>Data e Horário</Text>
            </View>
            
            <View style={estilos.campoModerno}>
              <Text style={estilos.labelModerno}>Data da Visita *</Text>
              <View style={estilos.inputContainer}>
                <Ionicons name="calendar-outline" size={20} color="#7B1E3A" style={estilos.inputIcon} />
                <TextInput
                  style={estilos.inputModerno}
                  value={dadosReserva.dataVisita}
                  onChangeText={(texto) => atualizarCampo('dataVisita', texto)}
                  placeholder="dd/mm/aaaa"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>

            <View style={estilos.campoModerno}>
              <Text style={estilos.labelModerno}>Horário *</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.horariosContainer}>
                {horariosDisponiveis.map((horario) => (
                  <TouchableOpacity
                    key={horario}
                    style={[
                      estilos.horarioModerno,
                      dadosReserva.horarioVisita === horario && estilos.horarioSelecionadoModerno
                    ]}
                    onPress={() => atualizarCampo('horarioVisita', horario)}
                  >
                    <Text style={[
                      estilos.horarioTextoModerno,
                      dadosReserva.horarioVisita === horario && estilos.horarioTextoSelecionadoModerno
                    ]}>
                      {horario}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={estilos.campoModerno}>
              <Text style={estilos.labelModerno}>Número de Visitantes</Text>
              <View style={estilos.inputContainer}>
                <Ionicons name="people-outline" size={20} color="#7B1E3A" style={estilos.inputIcon} />
                <TextInput
                  style={estilos.inputModerno}
                  value={dadosReserva.numeroVisitantes}
                  onChangeText={(texto) => atualizarCampo('numeroVisitantes', texto)}
                  placeholder="1"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          {/* Tipo de Tour */}
          <View style={estilos.secaoCard}>
            <View style={estilos.secaoHeader}>
              <Ionicons name="wine" size={24} color="#7B1E3A" />
              <Text style={estilos.secaoTitulo}>Tipo de Tour *</Text>
            </View>
            
            {tiposTours.map((tour) => (
              <TouchableOpacity
                key={tour.id}
                style={[
                  estilos.tourCardModerno,
                  dadosReserva.tipoTour === tour.id && estilos.tourSelecionadoModerno
                ]}
                onPress={() => atualizarCampo('tipoTour', tour.id)}
              >
                <View style={[
                  estilos.tourGradiente,
                  dadosReserva.tipoTour === tour.id && estilos.tourSelecionadoFundo
                ]}>
                  <View style={estilos.tourInfo}>
                    <Text style={[
                      estilos.tourNomeModerno,
                      dadosReserva.tipoTour === tour.id && estilos.tourTextoSelecionado
                    ]}>
                      {tour.nome}
                    </Text>
                    <Text style={[
                      estilos.tourDescricaoModerna,
                      dadosReserva.tipoTour === tour.id && estilos.tourTextoSelecionado
                    ]}>
                      {tour.descricao}
                    </Text>
                  </View>
                  <Text style={[
                    estilos.tourPrecoModerno,
                    dadosReserva.tipoTour === tour.id && estilos.tourPrecoSelecionado
                  ]}>
                    {tour.preco}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Observações */}
          <View style={estilos.secaoCard}>
            <View style={estilos.secaoHeader}>
              <Ionicons name="chatbubble" size={24} color="#7B1E3A" />
              <Text style={estilos.secaoTitulo}>Observações</Text>
            </View>
            
            <View style={estilos.campoModerno}>
              <View style={estilos.inputContainer}>
                <Ionicons name="text-outline" size={20} color="#7B1E3A" style={estilos.inputIconTextarea} />
                <TextInput
                  style={[estilos.inputModerno, estilos.textareaModerno]}
                  value={dadosReserva.observacoes}
                  onChangeText={(texto) => atualizarCampo('observacoes', texto)}
                  placeholder="Alguma observação especial?"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          {/* Botão de Envio */}
          <TouchableOpacity 
            style={estilos.botaoContainer} 
            onPress={enviarReserva}
            disabled={isLoading}
          >
            <View style={[estilos.botaoGradiente, isLoading && estilos.botaoDesabilitado]}>
              <Ionicons name="send" size={24} color="white" />
              <Text style={estilos.textoBotaoModerno}>
                {isLoading ? 'Enviando...' : 'Enviar Reserva'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  containerPrincipal: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  gradienteHeader: {
    paddingTop: 50,
    paddingBottom: 30,
  },
  headerSolido: {
    backgroundColor: '#7B1E3A',
    paddingTop: 50,
    paddingBottom: 30,
  },
  cabecalho: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: 15,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitulo: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.select({
      ios: 120, 
      android: 96, 
    }),
  },
  formulario: {
    padding: 20,
    marginTop: -20,
  },
  secaoCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 25,
    marginTop: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  secaoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  secaoTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7B1E3A',
    marginLeft: 12,
  },
  campoModerno: {
    marginBottom: 20,
  },
  labelModerno: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 5,
  },
  dicaCampo: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginLeft: 5,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputIcon: {
    marginRight: 12,
  },
  inputIconTextarea: {
    marginRight: 12,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  inputModerno: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    paddingHorizontal: 0,
  },
  textareaModerno: {
    height: 90,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  horariosContainer: {
    marginVertical: 10,
  },
  horarioModerno: {
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  horarioSelecionadoModerno: {
    backgroundColor: '#7B1E3A',
    borderColor: '#7B1E3A',
    shadowColor: '#7B1E3A',
    shadowOpacity: 0.3,
  },
  horarioTextoModerno: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  horarioTextoSelecionadoModerno: {
    color: 'white',
    fontWeight: 'bold',
  },
  tourCardModerno: {
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  tourSelecionadoModerno: {
    shadowColor: '#7B1E3A',
    shadowOpacity: 0.3,
    elevation: 10,
  },
  tourGradiente: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  tourSelecionadoFundo: {
    backgroundColor: '#7B1E3A',
  },
  tourInfo: {
    flex: 1,
  },
  tourNomeModerno: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1E3A',
    marginBottom: 4,
  },
  tourDescricaoModerna: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tourTextoSelecionado: {
    color: 'white',
  },
  tourPrecoModerno: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  tourPrecoSelecionado: {
    color: '#FFE55C',
  },
  botaoContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  botaoGradiente: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
    backgroundColor: '#7B1E3A',
  },
  botaoDesabilitado: {
    backgroundColor: '#999',
    opacity: 0.6,
  },
  textoBotaoModerno: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  // Estilos antigos mantidos para compatibilidade
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  campoContainer: {
    marginBottom: 20,
  },
  labelCampo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputCampo: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#333',
  },
  textareaObservacoes: {
    height: 80,
    paddingTop: 12,
  },
  horarioBotao: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
  },
  horarioSelecionado: {
    backgroundColor: '#7B1E3A',
    borderColor: '#7B1E3A',
  },
  horarioTexto: {
    fontSize: 14,
    color: '#333',
  },
  horarioTextoSelecionado: {
    color: 'white',
    fontWeight: 'bold',
  },
  tourCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tourSelecionado: {
    borderColor: '#7B1E3A',
    backgroundColor: '#FFF8F8',
  },
  tourNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B1E3A',
  },
  tourDescricao: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  tourPreco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  botaoEnviar: {
    backgroundColor: '#7B1E3A',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  textoBotaoEnviar: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});