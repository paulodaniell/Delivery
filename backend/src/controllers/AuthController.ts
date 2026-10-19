import { Request, Response } from "express";
import { db } from "../config/database";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';


export class AuthController{


    public login = async (req: Request,res: Response):Promise<Response> => {
        
        try {
            const { email , password} = req.body;

            if(!email || !password){
                return res.status(400).json({ error: 'Email e senha são obrigatórios.'})
            }   
            const [rows]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);

            if (!rows.length) {
                return res.status(401).json({ error: 'Credenciais inválidas.' });

            }
            const user = rows[0];
            
            const passwordMatch = await bcrypt.compare(password,user.password);

            if(!passwordMatch){
                return res.status(401).json({ error: 'Credenciais inválidas.' });
            }
            const secretKey = process.env.JWT_SECRET || 'sua_chave_secreta_padrao';
            const token = jwt.sign(
            { id: user.id, email: user.email },
            secretKey,
            { expiresIn: '1d' }
            );

            return res.status(200).json({
                message: 'Login efetuado com sucesso!',
                token,
                user: {
                id: user.id,
                name: user.name,
                email: user.email
                }
            });

        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}