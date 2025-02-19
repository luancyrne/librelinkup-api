const LibreLinkUpAPI = require('../src/index');
require('dotenv').config()

test('Login should return a valid token and accountId', async () => {
    const api = new LibreLinkUpAPI(process.env.LIBRE_EMAIL, process.env.LIBRE_PASSWORD);
    const { authToken, accountId } = await api.login();
    expect(authToken).toBeDefined();
    expect(accountId).toBeDefined();
});