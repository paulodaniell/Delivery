import { Product } from "../Product";

export interface IProductRepository {
  findById(id: number): Promise<Product | null>;
  findByRestaurantId(restaurantId: number): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  save(restaurantId: number, product: Product): Promise<void>; // <--- Adicione o restaurantId aqui
  update(id: number, product: Product): Promise<void>;
  delete(id: number): Promise<void>;
}