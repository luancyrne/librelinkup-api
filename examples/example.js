const { LibreLinkUpAPI, LibreLinkUpError } = require('./LibreLinkUpAPI'); require('dotenv').config();

(async () => { try { // Instantiating the API with environment credentials const libreAPI = new LibreLinkUpAPI();

console.log('Authenticating...');
await libreAPI._ensureAuthenticated();
console.log('Successfully authenticated!');

// Fetching connections
console.log('Fetching connections...');
const connections = await libreAPI.getConnections();
console.log('Connections retrieved:', connections);

if (connections.length === 0) {
  console.log('No connections found.');
  return;
}

// Retrieving the first patient from the connection list
const patientId = connections[0].patientId;
console.log(`Fetching glucose data for patient ${patientId}...`);

const glucoseData = await libreAPI.getGlucoseData(patientId);
console.log('Glucose data retrieved:', glucoseData);

} catch (error) { if (error instanceof LibreLinkUpError) { console.error(API Error: ${error.message} (Code: ${error.code})); } else { console.error('Unexpected error:', error); } } })();

