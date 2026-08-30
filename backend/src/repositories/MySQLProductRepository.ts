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

    async save(product: Product): Promise<void> {
        const isFood = product instanceof Food;
        const isDrink = product instanceof Drink;

        await db.query(
        `INSERT INTO products 
            (name, description, price, available, product_type, prep_time_minutes, packaging_fee, volume_ml, is_alcoholic) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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