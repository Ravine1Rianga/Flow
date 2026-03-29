const axios = require('axios');
require('dotenv').config();

class MpesaService {
  /**
   * Generates a Daraja Access Token
   */
  async getAccessToken() {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    
    // 1. Create the auth string (Key:Secret) and encode to Base64
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
      const response = await axios.get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );

      console.log("🎟️ New Access Token Generated");
      return response.data.access_token;
    } catch (error) {
      console.error('❌ M-Pesa OAuth Error:', error.response ? error.response.data : error.message);
      throw new Error('Failed to generate M-Pesa access token');
    }
  }
}

module.exports = new MpesaService();