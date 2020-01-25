const defaultPort = 3000;
const defaultGoogleOutputFormat = 'json';
const defaultGoogleSearchRadius = 5000;
const defaultGoogleOutputLanguage = 'ko';

export default () => ({
  port: parseInt(process.env.PORT, 10) || defaultPort,
  google: {
    apiKey: process.env.GOOGLE_PLACES_API_KEY,
    format:
      process.env.GOOGLE_PLACES_OUTPUT_FORMAT || defaultGoogleOutputFormat,
    searchRadius:
      parseInt(process.env.GOOGLE_PLACES_SEARCH_RADIUS, 10) ||
      defaultGoogleSearchRadius,
    outputLanguage:
      process.env.GOOGLE_PLACES_OUTPUT_LANGUAGE || defaultGoogleOutputLanguage,
  },
});
