const defaultPort = 3000;
const defaultGoogleOutputFormat = 'json';

export default () => ({
  port: parseInt(process.env.PORT, 10) || defaultPort,
  google: {
    apiKey: process.env.GOOGLE_PLACES_API_KEY,
    format:
      process.env.GOOGLE_PLACES_OUTPUT_FORMAT || defaultGoogleOutputFormat,
  },
});
