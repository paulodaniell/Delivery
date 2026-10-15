import { User } from '../domain/User';
import { Client } from '../domain/Client';
import { Courier } from '../domain/Courier';
import { MySQLUserRepository } from '../repositories/MySQLUserRepository';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository: MySQLUserRepository;

  constructor() {
    this.userRepository = new MySQLUserRepository();
  }

  public async registerUser(userData: {
    name: string;
    cpf: string;
    email: string;
    password: string;
    contactPhone: string;
    role: 'CLIENT' | 'COURIER';
    address?: string;          
    vehiclePlate?: string;     
    vehicleType?: 'MOTO' | 'CAR' | 'BICYCLE'; 
  }): Promise<User> {
    
    
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('E-mail já está em uso.');
    }

    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    let userToSave: User;

    
    if (userData.role === 'CLIENT') {
      if (!userData.address) {
        throw new Error('O endereço é obrigatório para clientes.');
      }

      userToSave = new Client(
        0, 
        userData.name,
        userData.cpf,
        userData.email,
        hashedPassword, 
        userData.contactPhone,
        userData.address
      );
    } 
    else if (userData.role === 'COURIER') {
      if (!userData.vehiclePlate || !userData.vehicleType) {
        throw new Error('Placa e tipo de veículo são obrigatórios para entregadores.');
      }

      userToSave = new Courier(
        0,
        userData.name,
        userData.cpf,
        userData.email,
        hashedPassword,
        userData.contactPhone,
        userData.vehiclePlate,
        userData.vehicleType,
        true 
      );
    } 
    else {
      throw new Error('Tipo de usuário inválido.');
    }

    
    await this.userRepository.save(userToSave);

    return userToSave;
  }
}