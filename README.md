# 🌱 GreenPoint

<p align="center">
  Sistema inteligente para facilitar o acesso à coleta seletiva ♻️
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" />
  <img src="https://img.shields.io/badge/Vite-fast-purple?logo=vite" />
  <img src="https://img.shields.io/badge/TypeScript-strong-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Supabase-backend-green?logo=supabase" />
  <img src="https://img.shields.io/badge/Status-Em%20desenvolvimento-yellow" />
</p>

---

## 📌 Sobre o projeto

O **GreenPoint** é uma aplicação web que ajuda usuários a encontrarem pontos de coleta de materiais recicláveis e consultarem o calendário de coleta em sua região.

A proposta é oferecer uma solução prática e acessível para incentivar a reciclagem, funcionando de forma semelhante à coleta de lixo tradicional — porém focada em materiais recicláveis e gerenciada por uma empresa.

---

## 🚀 Funcionalidades

### 🗓️ Calendário de coleta
- Consulta dos dias de coleta no bairro
- Busca por:
  - 📍 Localização atual (geolocalização)
  - 🏙️ Cidade e bairro

---

### 📍 Pontos de coleta
- Visualização de pontos próximos no mapa
- Exibição de endereços
- Integração com mapa interativo

---

## 🛠️ Tecnologias utilizadas

### 🎨 Frontend
- React
- Vite
- TypeScript
- Ant Design
- Leaflet + React Leaflet
- Axios
- Redux + React-Redux + Redux Persist
- React Icons

### 📱 APIs do navegador
- Geolocalização
- Câmera *(em integração)*

---

### ⚙️ Backend
- Supabase
  - Banco de dados
  - Autenticação
  - Edge Functions

---

## 📦 Como executar o projeto

### 🔧 Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

---

### ▶️ Rodando em desenvolvimento

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/greenpoint.git

# Acesse a pasta
cd greenpoint

# Instale as dependências
npm install

# Execute o projeto
npm run dev