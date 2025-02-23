const axios = require('axios');
const { LibreLinkUpAPI, LibreLinkUpError } = require('../src/index');
const { mockConnectionsResponse, mockGlucoseResponse, mockLoginResponse } = require('./mock')

jest.mock('axios');

describe('LibreLinkUpAPI', () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password123';
    let api;

    beforeEach(() => {
        jest.clearAllMocks();
        api = new LibreLinkUpAPI(mockEmail, mockPassword);
    });

    describe('Constructor', () => {
        it('should create instance with provided credentials', () => {
            const api = new LibreLinkUpAPI(mockEmail, mockPassword);
            expect(api.email).toBe(mockEmail);
            expect(api.password).toBe(mockPassword);
        });
    });

    describe('Authentication', () => {
        it('should authenticate successfully on first API call', async () => {
            axios.post.mockResolvedValueOnce(mockLoginResponse);
            axios.get.mockResolvedValueOnce(mockConnectionsResponse);

            await api.getConnections();

            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining('/auth/login'),
                { email: mockEmail, password: mockPassword },
                expect.any(Object)
            );
        });

        it('should reuse existing authentication', async () => {
            axios.post.mockResolvedValueOnce(mockLoginResponse);
            axios.get.mockResolvedValueOnce(mockConnectionsResponse);
            await api.getConnections();

            axios.get.mockResolvedValueOnce(mockConnectionsResponse);
            await api.getConnections();

            expect(axios.post).toHaveBeenCalledTimes(1);
        });

        it('should handle authentication failure', async () => {
            axios.post.mockResolvedValueOnce({
                data: { status: 1, message: 'Invalid credentials' }
            });

            await expect(api.getConnections()).rejects.toThrow(LibreLinkUpError);
        });
    });

    describe('getConnections', () => {
        beforeEach(() => {
            axios.post.mockResolvedValueOnce(mockLoginResponse);
        });

        it('should fetch connections successfully', async () => {
            axios.get.mockResolvedValueOnce(mockConnectionsResponse);

            const connections = await api.getConnections();

            expect(connections).toEqual(mockConnectionsResponse.data.data);
            expect(connections[0]).toHaveProperty('id');
            expect(connections[0]).toHaveProperty('patientId');
            expect(connections[0]).toHaveProperty('glucoseMeasurement');
            expect(connections[0]).toHaveProperty('sensor');
            expect(connections[0].glucoseMeasurement).toHaveProperty('Value');
            expect(connections[0].glucoseMeasurement).toHaveProperty('ValueInMgPerDl');
            expect(connections[0].glucoseMeasurement).toHaveProperty('Timestamp');
        });

        it('should handle connections fetch error', async () => {
            axios.get.mockRejectedValueOnce(new Error('Network error'));
            await expect(api.getConnections()).rejects.toThrow(LibreLinkUpError);
        });

        it('should handle empty connections response', async () => {
            axios.get.mockResolvedValueOnce({
                data: {
                    status: 0,
                    data: []
                }
            });

            const connections = await api.getConnections();
            expect(connections).toEqual([]);
        });
    });

    describe('getGlucoseData', () => {
        const patientId = 'patient-123';

        beforeEach(() => {
            axios.post.mockResolvedValueOnce(mockLoginResponse);
        });

        it('should fetch glucose data successfully', async () => {
            axios.get.mockResolvedValueOnce(mockGlucoseResponse);

            const glucoseData = await api.getGlucoseData(patientId);

            expect(glucoseData).toEqual(mockGlucoseResponse.data.data);
            expect(glucoseData).toHaveProperty('connection');
            expect(glucoseData).toHaveProperty('activeSensors');
            expect(glucoseData).toHaveProperty('graphData');
            expect(glucoseData.connection).toHaveProperty('glucoseMeasurement');
            expect(glucoseData.graphData).toBeInstanceOf(Array);
            expect(glucoseData.graphData[0]).toHaveProperty('Value');
            expect(glucoseData.graphData[0]).toHaveProperty('Timestamp');
        });

        it('should throw error when patientId is missing', async () => {
            await expect(api.getGlucoseData()).rejects.toThrow(LibreLinkUpError);
            await expect(api.getGlucoseData('')).rejects.toThrow(LibreLinkUpError);
        });

        it('should handle glucose data fetch error', async () => {
            axios.get.mockRejectedValueOnce(new Error('Network error'));
            await expect(api.getGlucoseData(patientId)).rejects.toThrow(LibreLinkUpError);
        });

        it('should handle empty graph data', async () => {
            const emptyResponse = {
                ...mockGlucoseResponse,
                data: {
                    ...mockGlucoseResponse.data,
                    data: {
                        ...mockGlucoseResponse.data.data,
                        graphData: []
                    }
                }
            };

            axios.get.mockResolvedValueOnce(emptyResponse);
            const glucoseData = await api.getGlucoseData(patientId);
            expect(glucoseData.graphData).toEqual([]);
        });
    });
});