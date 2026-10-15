import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { MySQLUserRepository } from '../repositories/MySQLUserRepository'; // ou injetar via serviço

export class UserController {
  private userService: UserService;
  private userRepository: MySQLUserRepository;

  constructor() {
    this.userService = new UserService();
    this.userRepository = new MySQLUserRepository();
  }

  
  public register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const newUser = await this.userService.registerUser(req.body);
      return res.status(201).json({
        message: 'Utilizador registado com sucesso!',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          contactPhone: newUser.contactPhone
        }
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };

  
  public getById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = Number(req.params.id);
      const user = await this.userRepository.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'Utilizador não encontrado.' });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };


  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users = await this.userRepository.findAll();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

 
    public update = async (req: Request, res: Response): Promise<Response> => {
        try {
        const id = Number(req.params.id);
        
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            return res.status(404).json({ error: 'Utilizador não encontrado.' });
        }

        
        await this.userRepository.update(id, req.body); 
        
        return res.status(200).json({ message: 'Utilizador atualizado com sucesso!' });
        } catch (error: any) {
        return res.status(400).json({ error: error.message });
        }
    };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id = Number(req.params.id);
      await this.userRepository.delete(id);
      return res.status(200).json({ message: 'Utilizador removido com sucesso!' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };
}