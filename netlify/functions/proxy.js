const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const url = 'https://fascinating-daifuku-8a0ca0.netlify.app/' + event.path.replace('/.netlify/functions/proxy', '');
  
  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        'Content-Type': 'application/json',
      },
      body: event.body,
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*', // Change this to your specific domain if needed
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred', details: error.toString() })
    };
  }
}
