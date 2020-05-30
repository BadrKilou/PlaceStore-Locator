const NodeGeoCoder = require('node-geocoder');
const path = require('path')

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
}



const geocoder = NodeGeoCoder(options);

module.exports = geocoder;
 
