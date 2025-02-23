# LibreLinkUp API 
[![npm version](https://img.shields.io/npm/v/librelinkup-api.svg)](https://www.npmjs.com/package/librelinkup-api)
[![npm downloads](https://img.shields.io/npm/dt/librelinkup-api.svg)](https://www.npmjs.com/package/librelinkup-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<details open>
<summary>🇺🇸 English</summary>

Unofficial library to integrate with the LibreLinkUp API and programmatically retrieve glucose data. This library allows authentication, connection listing, and glucose data retrieval for specific devices.

---

## 🚀 Features

- **Authentication:** Logs into the LibreLinkUp API using email and password credentials.
- **Retrieve Connections:** Lists all connections associated with the user’s account.
- **Glucose Query:** Returns glucose data for a specific device, providing detailed and real-time information.

---

## 📦 Installation

```bash
npm install librelinkup-api
```

---

## 🔧 Environment Setup

Create a `.env` file in the project root and fill it with your LibreLinkUp credentials:

```plaintext
LIBRE_EMAIL=your-email@example.com  
LIBRE_PASSWORD=your-secure-password  
```

Make sure your `.env` file is listed in `.gitignore` to avoid leaking sensitive information.

---

## Quick Start

```javascript
const { LibreLinkUpAPI } = require('librelinkup-api');

// Create instance with direct credentials
const api = new LibreLinkUpAPI('email@example.com', 'password');

// Or use environment variables (LIBRE_EMAIL and LIBRE_PASSWORD)
const { getConnections, getGlucoseData } = new LibreLinkUpAPI();

// Get all connections
const connections = await getConnections();
console.log('Connections:', connections);

// Get glucose data for a specific patient
const glucoseData = await getGlucoseData(connections[0].patientId);
console.log('Glucose Data:', glucoseData);
```

## API Reference

### `new LibreLinkUpAPI([email], [password])`

Creates a new instance of the LibreLinkUp API client.

- **Parameters:**
  - `email` (optional): Your LibreLinkUp account email. Falls back to `LIBRE_EMAIL` environment variable.
  - `password` (optional): Your LibreLinkUp account password. Falls back to `LIBRE_PASSWORD` environment variable.
- **Throws:** `LibreLinkUpError` if credentials are missing or invalid

### `async getConnections()`

Retrieves all connections associated with the account.

- **Returns:** `Promise<Array>` - List of connections with their details
  ```typescript
  {
    id: string;
    patientId: string;
    country: string;
    status: number;
    firstName: string;
    lastName: string;
    targetLow: number;
    targetHigh: number;
    glucoseMeasurement: {
      FactoryTimestamp: string;
      Timestamp: string;
      type: number;
      ValueInMgPerDl: number;
      Value: number;
      isHigh: boolean;
      isLow: boolean;
    };
  }[]
  ```

### `async getGlucoseData(patientId)`

Retrieves glucose data for a specific patient.

- **Parameters:**
  - `patientId`: String - The patient ID to fetch data for
- **Returns:** `Promise<Object>` - Detailed glucose data
  ```typescript
  {
    connection: {
      // Connection details
    };
    activeSensors: Array;
    graphData: [{
      FactoryTimestamp: string;
      Timestamp: string;
      type: number;
      ValueInMgPerDl: number;
      Value: number;
      isHigh: boolean;
      isLow: boolean;
    }];
  }
  ```

## Error Handling

The library uses a custom `LibreLinkUpError` class that includes:
- Error message
- Error code
- Original error (if applicable)

Common error codes:
```typescript
{
  MISSING_CREDENTIALS: "Email and password are required",
  AUTH_FAILED: "Authentication failed",
  AUTH_ERROR: "Error during authentication",
  MISSING_PATIENT_ID: "Patient ID is required",
  FETCH_CONNECTIONS_FAILED: "Failed to fetch connections",
  FETCH_GLUCOSE_FAILED: "Failed to fetch glucose data"
}
```

Example error handling:
```javascript
try {
  const connections = await getConnections();
} catch (error) {
  if (error.code === 'AUTH_FAILED') {
    console.error('Authentication failed:', error.message);
  } else {
    console.error('Error:', error.message);
  }
}
```

---

## 🧪 Testing

Run automated tests with:

```bash
npm test
```

Ensure that the `.env` file is correctly configured before running tests.

---

## 🛠️ Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Axios:** HTTP client to make API requests.
- **dotenv:** Secure credential management.
- **Jest:** Automated testing framework.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open **Issues** and **Pull Requests**.

1. Fork the project.
2. Create a new branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push your changes (`git push origin feature/new-feature`).
5. Open a **Pull Request**.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This project is an unofficial integration with LibreLinkUp and should be used only for educational and development purposes. Improper use may violate Abbott’s terms of service and pose security and privacy risks.



</details>

<details>
<summary>🇧🇷 Português</summary>

Biblioteca não oficial para integrar com a API do LibreLinkUp e obter dados de glicemia de forma programática. Esta biblioteca permite autenticação, listagem de conexões e obtenção de dados de glicemia para dispositivos específicos.

---

## 🚀 Funcionalidades

- **Autenticação:** Realiza o login na API do LibreLinkUp usando credenciais de e-mail e senha.
- **Obtenção de Conexões:** Lista todas as conexões associadas à conta do usuário.
- **Consulta de Glicemia:** Retorna os dados de glicemia para um dispositivo específico, fornecendo informações detalhadas e em tempo real.

---

## 📦 Instalação

```bash
npm install librelinkup-api
```

---

## 🔧 Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto e preencha com suas credenciais do LibreLinkUp:

```plaintext
LIBRE_EMAIL=seu-email@example.com  
LIBRE_PASSWORD=sua-senha-segura  
```

Certifique-se de que o arquivo `.env` está listado no `.gitignore` para evitar o vazamento de informações sensíveis.

---

## Início Rápido

```javascript
const { LibreLinkUpAPI } = require('librelinkup-api');

// Criar instância com credenciais diretas
const api = new LibreLinkUpAPI('email@example.com', 'senha');

// Ou usar variáveis de ambiente (LIBRE_EMAIL e LIBRE_PASSWORD)
const { getConnections, getGlucoseData } = new LibreLinkUpAPI();

// Obter todas as conexões
const connections = await getConnections();
console.log('Conexões:', connections);

// Obter dados de glicose para um paciente específico
const glucoseData = await getGlucoseData(connections[0].patientId);
console.log('Dados de Glicose:', glucoseData);
```

## Referência da API

### `new LibreLinkUpAPI([email], [senha])`

Cria uma nova instância do cliente da API LibreLinkUp.

- **Parâmetros:**
  - `email` (opcional): Seu email da conta LibreLinkUp. Usa `LIBRE_EMAIL` do ambiente se não fornecido.
  - `senha` (opcional): Sua senha da conta LibreLinkUp. Usa `LIBRE_PASSWORD` do ambiente se não fornecida.
- **Lança:** `LibreLinkUpError` se as credenciais estiverem faltando ou inválidas

### `async getConnections()`

Recupera todas as conexões associadas à conta.

- **Retorna:** `Promise<Array>` - Lista de conexões com seus detalhes
  ```typescript
  {
    id: string;
    patientId: string;
    country: string;
    status: number;
    firstName: string;
    lastName: string;
    targetLow: number;
    targetHigh: number;
    glucoseMeasurement: {
      FactoryTimestamp: string;
      Timestamp: string;
      type: number;
      ValueInMgPerDl: number;
      Value: number;
      isHigh: boolean;
      isLow: boolean;
    };
  }[]
  ```

### `async getGlucoseData(patientId)`

Recupera dados de glicose para um paciente específico.

- **Parâmetros:**
  - `patientId`: String - O ID do paciente para buscar os dados
- **Retorna:** `Promise<Object>` - Dados detalhados de glicose
  ```typescript
  {
    connection: {
      // Detalhes da conexão
    };
    activeSensors: Array;
    graphData: [{
      FactoryTimestamp: string;
      Timestamp: string;
      type: number;
      ValueInMgPerDl: number;
      Value: number;
      isHigh: boolean;
      isLow: boolean;
    }];
  }
  ```

## Tratamento de Erros

A biblioteca usa uma classe personalizada `LibreLinkUpError` que inclui:
- Mensagem de erro
- Código do erro
- Erro original (se aplicável)

Códigos de erro comuns:
```typescript
{
  MISSING_CREDENTIALS: "Email e senha são obrigatórios",
  AUTH_FAILED: "Autenticação falhou",
  AUTH_ERROR: "Erro durante a autenticação",
  MISSING_PATIENT_ID: "ID do paciente é obrigatório",
  FETCH_CONNECTIONS_FAILED: "Falha ao buscar conexões",
  FETCH_GLUCOSE_FAILED: "Falha ao buscar dados de glicose"
}
```

Exemplo de tratamento de erro:
```javascript
try {
  const connections = await getConnections();
} catch (error) {
  if (error.code === 'AUTH_FAILED') {
    console.error('Falha na autenticação:', error.message);
  } else {
    console.error('Erro:', error.message);
  }
}
```

---

## 🧪 Testes

Execute os testes automatizados com o comando:

```bash
npm test
```

Certifique-se de ter configurado corretamente o arquivo `.env` antes de rodar os testes.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript.
- **Axios:** Cliente HTTP para fazer as requisições à API.
- **dotenv:** Para gerenciamento seguro de credenciais.
- **Jest:** Para testes automatizados.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir **Issues** e **Pull Requests**.

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Faça o commit (`git commit -m 'Adiciona nova feature'`).
4. Envie as alterações (`git push origin feature/nova-feature`).
5. Abra um **Pull Request**.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## ⚠️ Aviso Legal

Este projeto é uma integração não oficial com o LibreLinkUp e deve ser usado apenas para fins educacionais e de desenvolvimento. O uso indevido pode violar os termos de serviço da Abbott e trazer riscos de segurança e privacidade.



</details>
