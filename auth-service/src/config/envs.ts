import { get } from 'env-var';

export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  MYSQL_DB_NAME: get('MYSQL_DB_NAME').required().asString(),
  MYSQL_DB_USER: get('MYSQL_DB_USER').required().asString(),
  MYSQL_DB_PASSWORD: get('MYSQL_DB_PASSWORD').required().asString(),
  MYSQL_DB_HOST: get('MYSQL_DB_HOST').required().asString(),
  MYSQL_DB_PORT: get('MYSQL_DB_PORT').required().asPortNumber(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  PRODUCT_SERVICE_URL: get('PRODUCT_SERVICE_URL').required().asString(),

}
