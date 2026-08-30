import { User } from "../User";

export interface IUserRepository{
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    save(product: User): Promise<void>;
    update(id: number, user: User): Promise<void>;
    delete(id: number): Promise<void>;
}