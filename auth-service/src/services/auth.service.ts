import { bcryptAdapter } from "../config/bcrypt";
import { CustomError } from "../config/custom.errors";
import { JwtAdapter } from "../config/jwt";
import Database from "../data/mysql/databases";
import User from "../models/user.model";

const db = Database.getInstance();

export class AuthService {

    async register(user: User) {
        const userExists = "SELECT * FROM users WHERE email = ?";
        const [userExistsResult] = await db.query(userExists, [user.email]);
        if (userExistsResult) throw CustomError.badRequest('Email already exists');

        try {

            const { username, email, password } = user;
            const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            const hashedPassword = bcryptAdapter.hash(password);

            await db.query(sql, [username, email, hashedPassword]);

            return {
                message: 'User registered successfully',
                user: { username, email },
            }

        } catch (error) {
            throw CustomError.internalServer("Internal server error");
        }
    }

    async login(user: User) {
        const userExists = "SELECT * FROM users WHERE email = ?";
        const [userExistsResult] = await db.query(userExists, [user.email]);
        if (!userExistsResult) throw CustomError.badRequest('Invalid email or password');

        const passwordMatches = bcryptAdapter.compare(user.password, userExistsResult.password);
        if (!passwordMatches) throw CustomError.badRequest('Invalid email or password');

        try {
            
            const token = await JwtAdapter.generateToken({ id: userExistsResult.id });
            return {
                token,
            }
        } catch (error) {
            throw CustomError.internalServer("Internal server error");
        }
    }

    async validateToken(token: string) {
        try {
            const decoded = await JwtAdapter.validateToken(token);
            if ( !decoded ) throw CustomError.unauthorized('Invalid token');
            return true;
        } catch (error) {
            throw CustomError.unauthorized('Unauthorized');
        }
    }

}
