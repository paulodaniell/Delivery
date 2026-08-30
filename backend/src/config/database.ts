import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "delivery_db",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true 
});

export async function testDatabaseConnection(): Promise<void> {
  try {
    const connection = await db.getConnection();
    console.log(" Conexão com o banco de dados MySQL estabelecida com sucesso!");
    connection.release();
  } catch (error) {
    console.error(" Erro ao conectar com o banco de dados:", error);
    process.exit(1);
  }
}