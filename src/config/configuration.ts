const defaultPort = 3000;
const defaultGoogleOutputFormat = 'json';

export default () => ({
  port: parseInt(process.env.PORT, 10) || defaultPort,
  google: {
    apiKey: process.env.GOOGLE_PLACES_API_KEY,
    format:
      process.env.GOOGLE_PLACES_OUTPUT_FORMAT || defaultGoogleOutputFormat,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DBNAME || 'postgres',
  },
});
