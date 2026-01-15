# 📱 Frontend Mobile - App Vinícola

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-0.81.4-blue)
![Expo](https://img.shields.io/badge/Expo-54.0.12-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-blue)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey)

**Aplicativo mobile multiplataforma para experiência interativa em vinícolas com scanner QR Code, catálogo de produtos e sistema de reservas.**

</div>

---

## 📋 Índice

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Desenvolvimento](#-desenvolvimento)
- [Build & Deploy](#-build--deploy)
- [Componentes](#-componentes)

---

## 🎯 Sobre

Aplicativo mobile desenvolvido com **React Native** e **Expo** que transforma a experiência de visitação em vinícolas através de tecnologia QR Code.

### Por que este projeto se destaca?

✨ **Tecnologias Modernas**: React Native 0.81 + Expo SDK 54  
📸 **Scanner QR Code Nativo**: Integração com Expo Camera  
🎨 **Design Responsivo**: Tema claro/escuro dinâmico  
🚀 **Navegação Fluida**: Expo Router v6 com file-based routing  
💾 **Estado Persistente**: AsyncStorage para dados offline  
🔐 **Autenticação Segura**: Login/Cadastro com validação  

---

## ⚡ Funcionalidades

### 🏠 Tela Principal (Home)
- Lista de produtos da vinícola em cards interativos
- Carrossel de imagens destacadas
- Busca e filtros de produtos
- Pull-to-refresh para atualização

### 📸 Scanner QR Code
- Leitor de QR Code em tempo real
- Detecção automática e feedback visual
- Redirecionamento para detalhes do produto
- Permissões de câmera gerenciadas

### 📖 Detalhes do Produto
- Informações completas do item
- Galeria de imagens em carrossel
- Botão de reserva/compra
- Compartilhamento social

### 🎫 Sistema de Reservas
- Lista de reservas do usuário
- Criação de novas reservas
- Cancelamento e edição
- Histórico completo

### 👤 Autenticação
- Login com email e senha
- Cadastro de novos usuários
- Validação de formulários
- Recuperação de senha (futuro)

### 🌗 Tema Dinâmico
- Modo claro/escuro automático
- Adaptação ao tema do sistema
- Cores personalizadas por tema

---

## 🏗️ Arquitetura

```
TccVinicola/
├── app/                          # 📱 Rotas e Telas (Expo Router)
│   ├── _layout.tsx               # Layout raiz com navegação
│   ├── index.tsx                 # Tela inicial/splash
│   ├── welcome.tsx               # Boas-vindas
│   ├── login.tsx                 # Autenticação
│   ├── cadastro.tsx              # Registro
│   ├── qr-scanner.tsx            # Scanner QR Code
│   ├── qr-description.tsx        # Detalhes do produto
│   │
│   └── (tabs)/                   # 🗂️ Navegação por Abas
│       ├── _layout.tsx           # Config das tabs
│       ├── index.tsx             # Home/Catálogo
│       ├── explore.tsx           # Explorar
│       ├── scanner.tsx           # Acesso rápido ao scanner
│       └── reservas.tsx          # Minhas reservas
│
├── components/                   # 🧩 Componentes Reutilizáveis
│   ├── Collapsible.tsx           # Accordion
│   ├── ExternalLink.tsx          # Links externos
│   ├── HapticTab.tsx             # Tab com feedback tátil
│   ├── ParallaxScrollView.tsx    # Scroll com parallax
│   ├── ThemedText.tsx            # Texto tematizado
│   ├── ThemedView.tsx            # Container tematizado
│   │
│   └── ui/                       # 🎨 Componentes UI Customizados
│       ├── BottomSheets.tsx      # Bottom sheets modais
│       ├── Carrossel.tsx         # Carrossel de imagens
│       ├── IconSymbol.tsx        # Ícones SF Symbols
│       └── TabBarBackground.tsx  # Fundo customizado das tabs
│
├── services/                     # 🌐 Integração com API
│   └── apiService.ts             # Cliente HTTP + endpoints
│
├── hooks/                        # 🪝 Custom Hooks
│   ├── useApi.ts                 # Hook para chamadas API
│   ├── useColorScheme.ts         # Hook de tema
│   └── useThemeColor.ts          # Hook de cores do tema
│
├── constants/                    # 🎨 Constantes
│   └── Colors.ts                 # Paleta de cores
│
├── assets/                       # 🖼️ Assets estáticos
│   ├── fonts/                    # Fontes customizadas
│   └── images/                   # Imagens e ícones
│
├── .env                          # ⚙️ Variáveis de ambiente
├── package.json                  # 📦 Dependências
├── tsconfig.json                 # ⚙️ Config TypeScript
├── app.json                      # ⚙️ Config Expo
└── eas.json                      # 🚀 Config EAS Build
```

### Padrões Arquiteturais

- **File-based Routing**: Expo Router v6 (similar ao Next.js)
- **Component Composition**: Componentes pequenos e reutilizáveis
- **Theme System**: Cores dinâmicas baseadas em tema
- **Service Layer**: Separação de lógica de API
- **Custom Hooks**: Reutilização de lógica complexa

---

## 🔧 Instalação

### Pré-requisitos

- **Node.js** 18+ e npm
- **Expo CLI** (opcional, mas recomendado)
- **Expo Go** app instalado no celular:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Passo a Passo

```bash
# Clone o repositório
git clone <seu-repositorio>

# Entre na pasta do frontend
cd TccVinicola

# Instale as dependências
npm install

# Configure a URL da API
# Edite o arquivo .env com a URL do backend
echo "API_URL=http://SEU-IP:3333" > .env

# Inicie o Expo Dev Server
npm start
```

### 📱 Executando no Celular

1. Abra o app **Expo Go** no seu celular
2. Escaneie o QR Code exibido no terminal ou navegador
3. Aguarde o bundle ser baixado
4. Teste o app! 🎉

### 💻 Executando no Emulador

**Android:**
```bash
npm run android
```

**iOS (somente macOS):**
```bash
npm run ios
```

---

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

```env
# URL da API Backend
# Para desenvolvimento local, use o IP da sua máquina
API_URL=http://192.168.1.10:3333

# Para produção (Railway)
# API_URL=https://backendtcc-production.up.railway.app
```

**⚠️ IMPORTANTE**: 
- Não use `localhost` ou `127.0.0.1` (não funciona no celular)
- Use o IP da sua máquina na rede local
- O arquivo `.env` agora está no `.gitignore` (segurança!)

### Como descobrir seu IP local?

**Windows:**
```powershell
ipconfig
# Procure por "Endereço IPv4" na conexão ativa
```

**Linux/Mac:**
```bash
ifconfig
# ou
ip addr show
```

---

## 🎨 Sistema de Temas

### Cores Definidas

```typescript
// constants/Colors.ts
export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#0a7ea4',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#fff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#fff',
  },
};
```

### Uso em Componentes

```tsx
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

function MyComponent() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Olá Mundo!</ThemedText>
    </ThemedView>
  );
}
```

---

## 🌐 Integração com API

### Service Layer (apiService.ts)

```typescript
import { API_URL } from '@/constants/Config';

export const apiService = {
  // Buscar todos os itens
  async getItens() {
    const response = await fetch(`${API_URL}/itens`);
    return response.json();
  },

  // Login
  async login(email: string, senha: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });
    return response.json();
  },

  // Criar reserva
  async createReserva(data: ReservaData) {
    const response = await fetch(`${API_URL}/reservas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
```

### Hook Customizado (useApi.ts)

```typescript
import { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService';

export function useApi<T>(apiCall: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    apiCall()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
```

---

## 📸 Scanner QR Code

### Implementação (qr-scanner.tsx)

```tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View><Text>Carregando...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Precisamos de permissão para acessar a câmera</Text>
        <Button onPress={requestPermission} title="Permitir" />
      </View>
    );
  }

  function handleBarCodeScanned({ data }: { data: string }) {
    setScanned(true);
    // Navegar para tela de detalhes
    router.push(`/qr-description?id=${data}`);
  }

  return (
    <CameraView
      style={StyleSheet.absoluteFillObject}
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ['qr'],
      }}
    />
  );
}
```

---

## 🚀 Build & Deploy

### Build de Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
npm start

# Ou com opções específicas
npm start -- --clear  # Limpa cache
npm start -- --tunnel # Usa túnel (útil em algumas redes)
```

### Build de Produção (EAS)

#### 1️⃣ Configuração Inicial

```bash
# Instale EAS CLI globalmente
npm install -g eas-cli

# Login na sua conta Expo
eas login

# Configure o projeto
eas build:configure
```

#### 2️⃣ Build Android

```bash
# Build APK para teste
eas build --platform android --profile preview

# Build AAB para Play Store
eas build --platform android --profile production
```

#### 3️⃣ Build iOS (requer macOS e Apple Developer Account)

```bash
# Build para simulador
eas build --platform ios --profile development

# Build para TestFlight/App Store
eas build --platform ios --profile production
```

### Configuração EAS (eas.json)

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

---

## 🧩 Componentes Principais

### ThemedText

Componente de texto com suporte a temas.

```tsx
<ThemedText type="title">Título Principal</ThemedText>
<ThemedText type="subtitle">Subtítulo</ThemedText>
<ThemedText type="defaultSemiBold">Texto em negrito</ThemedText>
<ThemedText type="link">Link clicável</ThemedText>
```

### Carrossel

Carrossel de imagens com indicadores.

```tsx
import Carrossel from '@/components/ui/Carrossel';

<Carrossel
  images={[
    '/api/images/1.jpg',
    '/api/images/2.jpg',
  ]}
  height={300}
/>
```

### BottomSheet

Modal que desliza de baixo.

```tsx
import BottomSheet from '@/components/ui/BottomSheets';

<BottomSheet
  visible={isVisible}
  onClose={() => setIsVisible(false)}
  title="Confirmar Reserva"
>
  <Text>Conteúdo do bottom sheet</Text>
</BottomSheet>
```

---

## 📦 Dependências Principais

### Core

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| `expo` | 54.0.12 | Framework Expo |
| `react` | 19.1.0 | Biblioteca React |
| `react-native` | 0.81.4 | Framework React Native |

### Navegação

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| `expo-router` | ~6.0.10 | Navegação file-based |
| `@react-navigation/native` | ^7.1.6 | Base de navegação |
| `@react-navigation/bottom-tabs` | ^7.3.10 | Tabs inferiores |

### Features

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| `expo-camera` | ~17.0.8 | Acesso à câmera + QR Scanner |
| `expo-linear-gradient` | ~15.0.7 | Gradientes lineares |
| `@react-native-async-storage/async-storage` | 2.2.0 | Armazenamento local |
| `react-native-reanimated` | ~4.1.1 | Animações performáticas |

---

## 🧪 Testes

### Executar no Expo Go

```bash
npm start
# Escaneie o QR Code no celular
```

### Testar Specific Features

```bash
# Testar no Android
npm run android

# Testar no iOS (macOS only)
npm run ios

# Testar na web
npm run web
```

---

## 🐛 Troubleshooting

### ❌ Metro Bundler não inicia

```bash
# Limpe o cache e reinicie
npm start -- --clear
```

### ❌ Erro "Unable to resolve module"

```bash
# Reinstale node_modules
rm -rf node_modules
npm install
```

### ❌ Câmera não funciona

Verifique permissões em app.json:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Permite usar a câmera para escanear QR Codes"
        }
      ]
    ]
  }
}
```

### ❌ API não conecta

1. Verifique se o backend está rodando
2. Confirme que o IP no `.env` está correto
3. Teste a URL no navegador: `http://SEU-IP:3333/itens`
4. Desabilite firewall/antivírus temporariamente

---

## 📊 Performance

### Otimizações Implementadas

- **Lazy Loading**: Imagens carregadas sob demanda
- **Memoization**: Componentes memoizados com `React.memo`
- **FlatList**: Renderização eficiente de listas longas
- **Reanimated**: Animações executadas na thread nativa

### Dicas de Performance

```tsx
// Use FlatList para listas longas
import { FlatList } from 'react-native';

<FlatList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  keyExtractor={(item) => item.id.toString()}
  removeClippedSubviews={true}  // Otimização
  maxToRenderPerBatch={10}      // Renderizar 10 por vez
/>

// Memoize componentes pesados
import { memo } from 'react';

const ItemCard = memo(({ item }) => {
  // Component logic
});
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/NovaFuncionalidade`
3. Commit: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push: `git push origin feature/NovaFuncionalidade`
5. Abra um Pull Request

---

## 📄 Licença

Projeto acadêmico (TCC) - Livre para uso educacional.

---

## 📞 Recursos Úteis

- **Expo Docs**: https://docs.expo.dev
- **React Native Docs**: https://reactnative.dev
- **Expo Router**: https://expo.github.io/router
- **EAS Build**: https://docs.expo.dev/build/introduction

---

<div align="center">

**Desenvolvido com ❤️ usando React Native + Expo**

[⬆ Voltar ao topo](#-frontend-mobile---app-vinícola)

</div>
