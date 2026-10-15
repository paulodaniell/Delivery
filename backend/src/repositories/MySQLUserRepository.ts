import { IUserRepository } from "../domain/interfaces/IUserRepository";
import { Client } from "../domain/Client";
import { Courier } from "../domain/Courier";
import {db} from "../config/database";
import {User} from "../domain/User";

export class MySQLUserRepository implements IUserRepository {

    
    private mapRowToUser(row: any): User | null {
        if (!row) return null;

        if (row.user_type === "CLIENT") {
            return new Client(
                row.id,             
                row.name,           
                row.cpf,            
                row.email,          
                row.password,       
                row.contact_phone,  
                row.address         
            );
        } 
        else if (row.user_type === "COURIER") {
            return new Courier(
                row.id,             
                row.name,           
                row.cpf,            
                row.email,          
                row.password,       
                row.contact_phone,  
                row.vehicle_plate,  
                row.vehicle_type,   
                Boolean(row.is_available) 
            );
        }

        return null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const [rows] = await db.query<any[]>(
            `SELECT u.*, c.address, co.vehicle_plate, co.vehicle_type, co.is_available 
             FROM users u 
             LEFT JOIN clients c ON u.id = c.user_id 
             LEFT JOIN couriers co ON u.id = co.user_id 
             WHERE u.email = ?`, 
            [email]
        );

        if (!rows || rows.length === 0) {
            return null;
        }

        return this.mapRowToUser(rows[0]);
    }

    async findById(id: number): Promise<User | null> {
        const [rows] = await db.query<any[]>(
            `SELECT u.*, c.address, co.vehicle_plate, co.vehicle_type, co.is_available 
             FROM users u 
             LEFT JOIN clients c ON u.id = c.user_id 
             LEFT JOIN couriers co ON u.id = co.user_id 
             WHERE u.id = ?`, 
            [id]
        );

        if (!rows || rows.length === 0) {
            return null;
        }

        return this.mapRowToUser(rows[0]);
    }

    async findAll(): Promise<User[]> {
        const [rows] = await db.query<any[]>(
            `SELECT u.*, c.address, co.vehicle_plate, co.vehicle_type, co.is_available 
             FROM users u 
             LEFT JOIN clients c ON u.id = c.user_id 
             LEFT JOIN couriers co ON u.id = co.user_id`
        );

        const users: User[] = [];

        for (const row of rows) {
            if (row.user_type === "CLIENT") {
                users.push(new Client(
                    row.id,             
                    row.name,           
                    row.cpf,            
                    row.email,          
                    row.password,       
                    row.contact_phone,  
                    row.address         
                ));
            } else if (row.user_type === "COURIER") {
                users.push(new Courier(
                    row.id,             
                    row.name,           
                    row.cpf,            
                    row.email,          
                    row.password,       
                    row.contact_phone,  
                    row.vehicle_plate,  
                    row.vehicle_type,   
                    Boolean(row.is_available) 
                ));
            }
        }

        return users;
    }

    async save(user: User): Promise<void> {
        
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            
            const isClient = user instanceof Client;
            const userType = isClient ? "CLIENT" : "COURIER";

            
            const [userResult]: any = await connection.query(
                `INSERT INTO users (name, cpf, email, password, contact_phone, user_type) VALUES (?, ?, ?, ?, ?, ?)`,
                [user.name, user.cpf, user.email, user.password, user.contactPhone, userType]
            );

            const userId = userResult.insertId;

            
            if (isClient) {
              
                const client = user as Client;
                await connection.query(
                    `INSERT INTO clients (user_id, address) VALUES (?, ?)`,
                    [userId, (client as any)._endereco || client.address] 
                );
            } else {
                const courier = user as Courier;
                await connection.query(
                    `INSERT INTO couriers (user_id, vehicle_plate, vehicle_type, is_available) VALUES (?, ?, ?, ?)`,
                    [
                        userId, 
                        (courier as any)._vehiclePlate, 
                        (courier as any)._vehicleType, 
                        (courier as any)._isAvailable ?? true
                    ]
                );
            }

            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async update(id: number, user: User): Promise<void> {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            
            await connection.query(
                `UPDATE users SET name = ?, cpf = ?, email = ?, password = ?, contact_phone = ? WHERE id = ?`,
                [user.name, user.cpf, user.email, user.password, user.contactPhone, id]
            );

            if (user instanceof Client) {
                const client = user as Client;
                await connection.query(
                    `UPDATE clients SET address = ? WHERE user_id = ?`,
                    [(client as any)._endereco || client.address, id]
                );
            } else if (user instanceof Courier) {
                const courier = user as Courier;
                await connection.query(
                    `UPDATE couriers SET vehicle_plate = ?, vehicle_type = ?, is_available = ? WHERE user_id = ?`,
                    [
                        (courier as any)._vehiclePlate, 
                        (courier as any)._vehicleType, 
                        (courier as any)._isAvailable, 
                        id
                    ]
                );
            }

            await connection.commit();
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    async delete(id: number): Promise<void> {
        await db.query(`DELETE FROM users WHERE id = ?`, [id]);
    }


}
