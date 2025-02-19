const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

class LibreLinkUpAPI {
    constructor(email, password) {
        this.email = email || process.env.LIBRE_EMAIL;
        this.password = password || process.env.LIBRE_PASSWORD;
        this.baseUrl = 'https://api-la.libreview.io/llu';
        this.authToken = null;
        this.accountId = null;
    }

    async login() {
        try {
            const response = await axios.post(`${this.baseUrl}/auth/login`, {
                email: this.email,
                password: this.password
            }, {
                headers: {
                    'Connection': 'Keep-Alive',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9; SM-X810N Build/PQ3B.190801.12191611)',
                    'product': 'llu.android',
                    'version': '4.13.0'
                }
            });

            if (response.data.status === 0) {
                this.authToken = response.data.data.authTicket.token;
                this.accountId = crypto.createHash('sha256').update(response.data.data.user.id).digest('hex');
                console.log('Login successful!');
                return {
                    authToken: this.authToken,
                    accountId: this.accountId
                };
            } else {
                throw new Error('Failed to authenticate.');
            }
        } catch (error) {
            console.error('Login Error:', error.message);
            throw error;
        }
    }

    async getConnections() {
        try {
            const response = await axios.get(`${this.baseUrl}/connections`, {
                headers: {
                    'Accept-Encoding': 'gzip',
                    'Account-Id': this.accountId,
                    'Authorization': `Bearer ${this.authToken}`,
                    'Connection': 'Keep-Alive',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9; SM-X810N Build/PQ3B.190801.12191611)',
                    'product': 'llu.android',
                    'version': '4.13.0'
                }
            });

            if (response.data.status === 0) {
                return response.data.data;
            } else {
                throw new Error('Failed to fetch connections.');
            }
        } catch (error) {
            console.error('Get Connections Error:', error.message);
            throw error;
        }
    }

    async getGlucoseData(patientId) {
        try {
            const response = await axios.get(`${this.baseUrl}/connections/${patientId}/graph`, {
                headers: {
                    'Account-Id': this.accountId,
                    'Authorization': `Bearer ${this.authToken}`,
                    'Connection': 'Keep-Alive',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9; SM-X810N Build/PQ3B.190801.12191611)',
                    'product': 'llu.android',
                    'version': '4.13.0'
                }
            });

            if (response.data.status === 0) {
                return response.data.data;
            } else {
                throw new Error('Failed to fetch glucose data.');
            }
        } catch (error) {
            console.error('Get Glucose Data Error:', error.message);
            throw error;
        }
    }
}

module.exports = LibreLinkUpAPI;