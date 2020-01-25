const defaultPort = 3000;

export default () => ({
  port: parseInt(process.env.PORT, 10) || defaultPort,
});
