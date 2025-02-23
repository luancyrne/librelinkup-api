<details open>
<summary>🇺🇸 English</summary>

# LibreLinkUp API [![npm](https://img.shields.io/npm/dt/librelinkup-api)](https://www.npmjs.com/package/librelinkup-api)

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

## 💻 Usage Example

```javascript
const LibreLinkUpAPI = require('librelinkup-api');

(async () => {
    const api = new LibreLinkUpAPI();
    await api.login();
    const connections = await api.getConnections();
    console.log('Connections:', connections);

    if (connections.length > 0) {
        const glucoseData = await api.getGlucoseData(connections[0].patientId);
        console.log('Glucose Data:', glucoseData);
    }
})();
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

# LibreLinkUp API [![npm](https://img.shields.io/npm/dt/librelinkup-api)](https://www.npmjs.com/package/librelinkup-api)

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

## 💻 Exemplo de Uso

```javascript
const LibreLinkUpAPI = require('librelinkup-api');

(async () => {
    const api = new LibreLinkUpAPI();
    await api.login();
    const connections = await api.getConnections();
    console.log('Conexões:', connections);

    if (connections.length > 0) {
        const glucoseData = await api.getGlucoseData(connections[0].patientId);
        console.log('Dados de Glicemia:', glucoseData);
    }
})();
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
