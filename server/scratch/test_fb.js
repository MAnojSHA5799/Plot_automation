const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const { FB_AD_ACCOUNT_ID, FB_ACCESS_TOKEN } = process.env;
const FB_GRAPH_URL = 'https://graph.facebook.com/v19.0';

async function testFBBreakdowns() {
  console.log('Testing FB Account:', FB_AD_ACCOUNT_ID);
  
  try {
    const response = await axios.get(`${FB_GRAPH_URL}/${FB_AD_ACCOUNT_ID}/insights`, {
      params: {
        access_token: FB_ACCESS_TOKEN,
        level: 'account',
        fields: 'reach,actions',
        breakdowns: 'age',
        date_preset: 'last_30d'
      }
    });
    
    console.log('Age Data:', JSON.stringify(response.data, null, 2));
    
    const regionResponse = await axios.get(`${FB_GRAPH_URL}/${FB_AD_ACCOUNT_ID}/insights`, {
      params: {
        access_token: FB_ACCESS_TOKEN,
        level: 'account',
        fields: 'reach,actions',
        breakdowns: 'region',
        date_preset: 'last_30d'
      }
    });
    
    console.log('Region Data:', JSON.stringify(regionResponse.data, null, 2));
    
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
  }
}

testFBBreakdowns();
