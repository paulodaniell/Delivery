import { IProductRepository } from "../domain/interfaces/IProductRepository";
import { Product } from "../domain/Product";
import { Food } from "../domain/Food";
import { Drink } from "../domain/Drink";
import { db } from "../config/database";

export class MySQLProductRepository implements IProductRepository {
    async findById(id: number): Promise<Product | null> {
        const [rows]: any = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        if (!rows.length) return null;

        const row = rows[0];
        if (row.product_type === "FOOD") {
            return new Food(
                row.id,
                row.name,
                row.description,
                Boolean(row.available),
                Number(row.price),
                row.prep_time_minutes,
                Number(row.packaging_fee)
            );
        } else {
            return new Drink(
                row.id,
                row.name,
                row.description,
                Boolean(row.available),
                Number(row.price),
                row.volume_ml,
                Boolean(row.is_alcoholic)
            );
        }
    }

    public async findByRestaurantId(restaurantId: number): Promise<Product[]> {
        const query = `
            SELECT p.*, 
                f.preparation_time, f.packaging, 
                d.capacity, d.alcoholic 
            FROM products p
            LEFT JOIN foods f ON p.id = f.product_id
            LEFT JOIN drinks d ON p.id = d.product_id
            WHERE p.restaurant_id = ?
        `;

        const [rows]: any = await db.query(query, [restaurantId]);

        return rows.map((row: any) => {
            if (row.product_type === 'FOOD') {
                return new Food(
                    row.id,
                    row.name,
                    row.description,
                    Boolean(row.available),
                    Number(row.price),
                    row.prep_time_minutes ?? row.preparation_time,
                    Number(row.packaging_fee ?? row.packaging ?? 0)
                );
            } 
            else if (row.product_type === 'DRINK') {
                return new Drink(
                    row.id,
                    row.name,
                    row.description,
                    Boolean(row.available),
                    Number(row.price),
                    row.volume_ml ?? row.capacity,
                    Boolean(row.is_alcoholic ?? row.alcoholic)
                );
            }

            throw new Error(`Tipo de produto desconhecido no banco de dados: ${row.product_type}`);
        });
    }

    async findAll(): Promise<Product[]> {
        const [rows]: any = await db.query("SELECT * FROM products");
        return rows.map((row: any) => {
            if (row.product_type === "FOOD") {
                return new Food(
                    row.id,
                    row.name,
                    row.description,
                    Boolean(row.available),
                    Number(row.price),
                    row.prep_time_minutes,
                    Number(row.packaging_fee)
                );
            }
            return new Drink(
                row.id,
                row.name,
                row.description,
                Boolean(row.available),
                Number(row.price),
                row.volume_ml,
                Boolean(row.is_alcoholic)
            );
        });
    }

    async save(restaurantId: number, product: Product): Promise<void> {
        const isFood = product instanceof Food;
        const isDrink = product instanceof Drink;

        await db.query(
            `INSERT INTO products 
                (restaurant_id, name, description, price, available, product_type, prep_time_minutes, packaging_fee, volume_ml, is_alcoholic) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                restaurantId,
                product.name,
                product.description,
                product.price,
                product.available,
                isFood ? "FOOD" : "DRINK",
                isFood ? (product as Food).tempoPreparo : null,
                isFood ? (product as Food).taxaEmbalagem : null,
                isDrink ? (product as Drink).capacity : null,
                isDrink ? (product as Drink).isAlcoholic : null
            ]
        );
    }

    async update(id: number, product: Product): Promise<void> {
        await db.query(
            "UPDATE products SET name = ?, description = ?, price = ?, available = ? WHERE id = ?",
            [product.name, product.description, product.price, product.available, id]
        );
    }

    async delete(id: number): Promise<void> {
        await db.query("DELETE FROM products WHERE id = ?", [id]);
    }
}