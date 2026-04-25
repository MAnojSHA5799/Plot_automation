const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const { FB_AD_ACCOUNT_ID, FB_ACCESS_TOKEN } = process.env;
const FB_GRAPH_URL = 'https://graph.facebook.com/v19.0';

async function testToken() {
  console.log('Testing Token for Account:', FB_AD_ACCOUNT_ID);
  
  try {
    const response = await axios.get(`${FB_GRAPH_URL}/${FB_AD_ACCOUNT_ID}`, {
      params: {
        access_token: FB_ACCESS_TOKEN,
        fields: 'name,account_status,currency'
      }
    });
    
    console.log('--- TOKEN TEST SUCCESSFUL ---');
    console.log('Account Name:', response.data.name);
    console.log('Status:', response.data.account_status === 1 ? 'Active' : 'Disabled');
    console.log('Currency:', response.data.currency);
    console.log('-----------------------------');
    
  } catch (error) {
    console.error('--- TOKEN TEST FAILED ---');
    console.error('Error:', error.response?.data || error.message);
    console.log('-------------------------');
  }
}

testToken();
