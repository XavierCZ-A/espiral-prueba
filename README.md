
## Pasos para correr la aplicación

### Requisitos

- Docker

### Correr aplicacion

1. **Clonar repositorio**

   ```bash
   git clone https://github.com/XavierCZ-A/espiral-prueba.git
   cd espiral-prueba
    ```

2. configurar variables de entorno
   - Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno (en el archivo `.env.template` están las variables de entorno que se deben configurar)
     ```bash
     MYSQL_USERS_DB_NAME=
     MYSQL_USERS_DB_USER=
     MYSQL_USERS_DB_PASSWORD=
     MYSQL_USERS_DB_HOST=
     MYSQL_USERS_DB_PORT=
     MYSQL_USERS_DB_ROOT_PASSWORD=
     
     
     MYSQL_PRODUCTS_DB_NAME=
     MYSQL_PRODUCTS_DB_USER=
     MYSQL_PRODUCTS_DB_PASSWORD=
     MYSQL_PRODUCTS_DB_HOST=
     MYSQL_PRODUCTS_DB_PORT=
     MYSQL_PRODUCTS_DB_ROOT_PASSWORD=
     ```

3. configurar variables de entorno de los servicios
   - Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno (en el archivo `.env.template` están las variables de entorno que se deben configurar)
     ```bash
     MYSQL_DB_NAME=
     MYSQL_DB_USER=
     MYSQL_DB_PASSWORD=
     MYSQL_DB_HOST=
     MYSQL_DB_PORT=
     MYSQL_DB_ROOT_PASSWORD=
     PORT=
     AUTH_SERVICE_URL=
     ```

4. correr el docker-compose
   ```bash
   docker-compose up --build
   ```

