export default () => {
  console.log('Loaded ENV Variables:');
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    cohere: {
      apiKey: process.env.CO_API_KEY,
      model: process.env.COHERE_MODEL || 'command',
    },
  };
};
