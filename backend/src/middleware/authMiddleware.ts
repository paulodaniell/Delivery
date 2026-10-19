import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

    export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
    }

    export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }


    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Erro no formato do token.' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token mal formatado.' });
    }

    const secretKey = process.env.JWT_SECRET || 'sua_chave_secreta_padrao';

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado.' });
        }

        req.user = decoded as { id: number; email: string };
        return next();
    });
    };