import mysql from 'mysql2/promise';
import { envs } from '../../config/envs';

class Database {
    private static instance: Database;
    private pool: mysql.Pool;

    private constructor() {
        this.pool = mysql.createPool({
            host: envs.MYSQL_DB_HOST,
            user: envs.MYSQL_DB_USER,
            password: envs.MYSQL_DB_PASSWORD,
            database: envs.MYSQL_DB_NAME,
            port: envs.MYSQL_DB_PORT,
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async query(sql: string, params?: any[]): Promise<any> {
        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.query(sql, params);
            return rows;
        } finally {
            connection.release();
        }
    }
}

export default Database;
