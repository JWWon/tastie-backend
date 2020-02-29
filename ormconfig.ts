import config from '@/config/configuration';

const cfg = config().db;
export = {
  type: 'postgres',
  host: cfg.host,
  port: cfg.port,
  username: cfg.username,
  password: cfg.password,
  database: cfg.database,
  entities: [`src/infrastructure/typeorm/model/*{.ts,.js}`],
  migrations: [`migrations/**/*{.ts,.js}`],
  cli: {
    migrationsDir: 'migrations',
  },
};
