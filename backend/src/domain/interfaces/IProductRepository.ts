import { Product } from "../Product";

export interface IProductRepository {
    findById(id: number): Promise<Product | null>;
    findAll(): Promise<Product[]>;
    save(product: Product): Promise<void>;
    update(id: number, product: Product): Promise<void>;
    delete(id: number): Promise<void>;
}