# 📱 Configuração de API - Backend Local vs Railway

## 🌐 Configuração Atual

### O aplicativo está configurado para usar:
1. **Primária**: Railway (produção) - `https://backendtcc-production.up.railway.app`
2. **Fallback**: Localhost (desenvolvimento) - várias URLs locais

---

## ❓ Preciso do Backend Local Rodando?

### ✅ **NÃO PRECISA** se:
- ✅ Backend no Railway está funcionando
- ✅ Você tem conexão com internet
- ✅ Está testando no celular (Expo Go)
- ✅ Está fazendo build de produção

### ⚠️ **PRECISA** se:
- ⚠️ Você está offline/sem internet
- ⚠️ Railway está fora do ar
- ⚠️ Quer testar mudanças no backend antes de fazer deploy

---

## 🚀 Cenários de Uso

### **Cenário 1: Desenvolvimento Normal (Recomendado)**
```bash
# No terminal do app
cd TccVinicola
npm start
# ou
npx expo start
```

✅ **Backend**: Usa Railway automaticamente  
✅ **Vantagem**: Não precisa rodar backend local  
✅ **Desvantagem**: Precisa de internet  

---

### **Cenário 2: Desenvolvimento Offline**
```bash
# Terminal 1 - Backend Local
cd Backend
npm start

# Terminal 2 - App
cd TccVinicola
npm start
```

✅ **Backend**: Usa localhost (com fallback)  
✅ **Vantagem**: Funciona offline  
✅ **Desvantagem**: Precisa rodar 2 servidores  

---

### **Cenário 3: Produção (Build Final)**
```bash
# Fazer build do app
cd TccVinicola
npx expo build:android
# ou
eas build --platform android
```

✅ **Backend**: Usa Railway (sempre)  
✅ **Vantagem**: Funciona em qualquer lugar  
✅ **Desvantagem**: Depende do Railway estar funcionando  

---

## 🔧 Como Trocar Entre Local e Railway

### Opção 1: Editar `.env` (Recomendado)
```bash
# Para usar Railway (padrão)
API_URL=https://backendtcc-production.up.railway.app

# Para forçar local
API_URL=http://192.168.1.5:3333
```

### Opção 2: Editar `app.json`
```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://backendtcc-production.up.railway.app"
    }
  }
}
```

### Opção 3: Deixar automático (atual)
O app tenta Railway primeiro, depois fallback para localhost.

---

## 🧪 Testar Qual Backend Está Respondendo

### No app, adicione este console.log:
Abra qualquer arquivo que usa a API e veja no console:
```
Tentando conectar em: https://backendtcc-production.up.railway.app/...
```

Se aparecer essa mensagem e funcionar = **Railway está sendo usado**  
Se tentar várias URLs = **Railway não respondeu, usando fallback**

---

## 📊 Prioridade de URLs (Ordem de Tentativa)

1. **Primeira tentativa**: URL configurada (Railway ou `apiUrl` do app.json)
2. **Segunda tentativa**: `http://192.168.1.5:3333` (seu IP local)
3. **Terceira tentativa**: `http://localhost:3333`
4. **Quarta tentativa**: `http://127.0.0.1:3333`

Se todas falharem = **Erro de conexão**

---

## 💡 Recomendação para Desenvolvimento

### **Durante o TCC (agora)**
✅ Use Railway para desenvolvimento  
✅ Não precisa rodar backend local  
✅ Mais simples e rápido  

### **Para testar mudanças no backend**
1. Faça as mudanças no código
2. Teste localmente primeiro (rode backend local)
3. Commit e push para GitHub
4. Railway faz deploy automático
5. Teste no Railway

---

## 🎯 Comandos Rápidos

### Testar tudo no Railway (sem backend local)
```powershell
cd TccVinicola
npm start
# Escaneia o QR no Expo Go
```

### Testar com backend local
```powershell
# Terminal 1
cd Backend
npm start

# Terminal 2
cd TccVinicola
# Edite .env para usar IP local
npm start
```

### Verificar qual backend está respondendo
```powershell
# No navegador
https://backendtcc-production.up.railway.app/health
# ou
http://localhost:3333/health
```

---

## ✅ Checklist de Produção

Antes de fazer build final:

- [ ] Railway está funcionando (status verde)
- [ ] Variáveis de ambiente configuradas no Railway
- [ ] MySQL conectado e com dados
- [ ] `.env` do app aponta para Railway
- [ ] Testado no Expo Go com Railway
- [ ] ⚠️ **NÃO** comitar arquivos `.env`

---

## 🆘 Troubleshooting

### App não conecta em nenhum backend
1. Verifique internet
2. Teste Railway no navegador: `https://backendtcc-production.up.railway.app/health`
3. Se local, verifique se backend está rodando: `http://localhost:3333`

### Railway não responde
1. Veja logs no Railway Dashboard
2. Verifique se MySQL está conectado
3. Faça redeploy

### Quer forçar local
1. Edite `.env`: `API_URL=http://localhost:3333`
2. Reinicie o Expo
3. Certifique-se que backend local está rodando
