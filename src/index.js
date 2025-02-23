const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

class LibreLinkUpError extends Error {
  constructor(message, code, originalError = null) {
    super(message);
    this.name = 'LibreLinkUpError';
    this.code = code;
    this.originalError = originalError;
  }
}

class LibreLinkUpAPI {
  /**
   * @param {string} [email]
   * @param {string} [password]
   * @throws {LibreLinkUpError}
   */
  constructor(email, password) {
    this.email = email || process.env.LIBRE_EMAIL;
    this.password = password || process.env.LIBRE_PASSWORD;
    
    if (!this.email || !this.password) {
      throw new LibreLinkUpError(
        'Email and password are required. Provide them directly or via environment variables.',
        'MISSING_CREDENTIALS'
      );
    }

    this.baseUrl = 'https://api-la.libreview.io/llu';
    this.authToken = null;
    this.accountId = null;
    this.loginPromise = null;
    
    this.defaultHeaders = {
      'Connection': 'Keep-Alive',
      'Content-Type': 'application/json',
      'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 9; SM-X810N Build/PQ3B.190801.12191611)',
      'product': 'llu.android',
      'version': '4.13.0'
    };

    this.getConnections = async () => {
      await this._ensureAuthenticated();

      try {
        const response = await axios.get(
          `${this.baseUrl}/connections`,
          {
            headers: {
              ...this._getAuthHeaders(),
              'Accept-Encoding': 'gzip'
            }
          }
        );

        if (response.data.status !== 0) {
          throw new LibreLinkUpError(
            'Failed to fetch connections',
            'FETCH_CONNECTIONS_FAILED',
            response.data
          );
        }

        return response.data.data;
      } catch (error) {
        if (error instanceof LibreLinkUpError) {
          throw error;
        }

        throw new LibreLinkUpError(
          'Error fetching connections',
          'CONNECTIONS_ERROR',
          error
        );
      }
    };

    this.getGlucoseData = async (patientId) => {
      if (!patientId) {
        throw new LibreLinkUpError(
          'Patient ID is required',
          'MISSING_PATIENT_ID'
        );
      }

      await this._ensureAuthenticated();

      try {
        const response = await axios.get(
          `${this.baseUrl}/connections/${patientId}/graph`,
          { headers: this._getAuthHeaders() }
        );

        if (response.data.status !== 0) {
          throw new LibreLinkUpError(
            'Failed to fetch glucose data',
            'FETCH_GLUCOSE_FAILED',
            response.data
          );
        }

        return response.data.data;
      } catch (error) {
        if (error instanceof LibreLinkUpError) {
          throw error;
        }

        throw new LibreLinkUpError(
          'Error fetching glucose data',
          'GLUCOSE_ERROR',
          error
        );
      }
    };
  }

  /**
   * @private
   */
  async _ensureAuthenticated() {
    if (this.authToken && this.accountId) {
      return;
    }

    if (this.loginPromise) {
      await this.loginPromise;
      return;
    }

    this.loginPromise = this._performLogin();
    try {
      await this.loginPromise;
    } finally {
      this.loginPromise = null;
    }
  }

  /**
   * @private
   */
  async _performLogin() {
    try {
      const response = await axios.post(
        `${this.baseUrl}/auth/login`,
        {
          email: this.email,
          password: this.password
        },
        { headers: this.defaultHeaders }
      );

      if (response.data.status !== 0) {
        throw new LibreLinkUpError(
          'Authentication failed',
          'AUTH_FAILED',
          response.data
        );
      }

      this.authToken = response.data.data.authTicket.token;
      this.accountId = crypto
        .createHash('sha256')
        .update(response.data.data.user.id)
        .digest('hex');

      return {
        authToken: this.authToken,
        accountId: this.accountId
      };
    } catch (error) {
      if (error instanceof LibreLinkUpError) {
        throw error;
      }

      throw new LibreLinkUpError(
        'Failed to authenticate with LibreView API',
        'AUTH_ERROR',
        error
      );
    }
  }

  /**
   * @private
   */
  _getAuthHeaders() {
    return {
      ...this.defaultHeaders,
      'Account-Id': this.accountId,
      'Authorization': `Bearer ${this.authToken}`
    };
  }
}

module.exports = {
  LibreLinkUpAPI,
  LibreLinkUpError
};