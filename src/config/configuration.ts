const defaultListenPort = 3000;
const defaultGoogleOutputFormat = 'json';

export default () => ({
  listen_port: parseInt(process.env.LISTEN_PORT, 10) || defaultListenPort,
  swagger: {
    enable: process.env.SWAGGER_ENABLE === 'true',
  },
  jwt: {
    authCodePrivateKey: process.env.AUTH_CODE_PRIVATE_KEY || 'privatekey',
    secretKey: process.env.JWT_SECRET_KEY || 'debugkey',
    accessTokenExpiresInSec: Number(
      process.env.ACCESS_TOKEN_EXPIRES_IN_SEC || 3600 * 24 * 30,
    ),
  },
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
    synchronize: process.env.DB_SYNC === 'true',
  },
  mongo: {
    url: process.env.MONGO_URL || '',
  },
  email: {
    passwordResetUrl:
      process.env.PASSWORD_RESET_URL || 'https://www.tastie.me/reset-password',
    sender: process.env.SENDER_EMAIL || 'mytastie@gmail.com',
  },
  sendinblue: {
    apiKey: process.env.SENDINBLUE_API_KEY || 'debug',
  },
});
