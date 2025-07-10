const axios = require('axios');

class WebhookService {
  constructor() {
    this.webhookUrl = process.env.WEBHOOK_URL;
  }

  /**
   * Send data to webhook (original functionality)
   * @param {Object} data - Data to send
   * @returns {Promise<Object>} - Response data
   */
  async sendToWebhook(data) {
    if (!this.webhookUrl) {
      throw new Error('WEBHOOK_URL environment variable is not set');
    }

    try {
      const response = await axios.post(this.webhookUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
    } catch (error) {
      console.error('Webhook request failed:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  }

  /**
   * Test webhook connectivity
   * @returns {Promise<boolean>} - Whether the webhook is reachable
   */
  async testConnection() {
    try {
      const response = await axios.get(this.webhookUrl, {
        timeout: 5000,
        validateStatus: () => true, // Accept any status code
      });
      
      console.log(`Webhook connectivity test successful. Status: ${response.status}`);
      return true;
    } catch (error) {
      console.error('Webhook connectivity test failed:', error.message);
      return false;
    }
  }
}

// Create singleton instance
const webhookService = new WebhookService();

module.exports = webhookService; 