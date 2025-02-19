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
