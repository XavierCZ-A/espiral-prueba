import { get } from 'env-var';

export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  MYSQL_DB_NAME: get('MYSQL_DB_NAME').required().asString(),
  MYSQL_DB_USER: get('MYSQL_DB_USER').required().asString(),
  MYSQL_DB_PASSWORD: get('MYSQL_DB_PASSWORD').required().asString(),
  MYSQL_DB_HOST: get('MYSQL_DB_HOST').required().asString(),
  MYSQL_DB_PORT: get('MYSQL_DB_PORT').required().asPortNumber(),
  AUTH_SERVICE_URL: get('AUTH_SERVICE_URL').required().asString(),
}
