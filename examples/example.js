const { LibreLinkUpAPI, LibreLinkUpError } = require('../src/index');
require('dotenv').config();

const API = new LibreLinkUpAPI();

const ExampleGetConnections = async () => {
  try {
    console.log('Fetching connections...');
    const connections = await API.getConnections();
    console.log('Connections retrieved:', connections);

    if (connections.length === 0) {
      console.log('No connections found.');
      return;
    }
  } catch (error) {
    if (error instanceof LibreLinkUpError) {
      console.error(error)
    }
  }
}

const ExampleGetGlucoseData = async () => {
  try {
    const glucoseData = await API.getGlucoseData(patientId);
    console.log('Glucose data retrieved:', glucoseData);
  } catch (error) {
    if (error instanceof LibreLinkUpError) {
      console.error(error)
    }
  }
}

const ExampleGetConnsWithGlucose = async () => {
  try {
    console.log('Fetching connections...');
    const connections = await API.getConnections();
    console.log('Connections retrieved:', connections);

    if (connections.length === 0) {
      console.log('No connections found.');
      return;
    }

    const patientId = connections[0].patientId;
    console.log(`Fetching glucose data for patient ${patientId}...`);

    const glucoseData = await API.getGlucoseData(patientId);
    console.log('Glucose data retrieved:', glucoseData);
  } catch (error) {
    if (error instanceof LibreLinkUpError) {
      console.error(error)
    }
  }
}

ExampleGetConnections()
ExampleGetGlucoseData()
ExampleGetConnsWithGlucose()