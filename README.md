# LibreLinkUp API

Biblioteca não oficial para integrar com a API do LibreLinkUp e obter dados de glicemia de forma programática. Esta biblioteca permite autenticação, listagem de conexões e obtenção de dados de glicemia para dispositivos específicos.

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
    console.log('Connections:', connections);

    if (connections.length > 0) {
        const glucoseData = await api.getGlucoseData(connections[0].patientId);
        console.log('Glucose Data:', glucoseData);
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

