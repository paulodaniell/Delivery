import { Product } from '../domain/Product';
import { Food } from '../domain/Food';
import { Drink } from '../domain/Drink';
import { MySQLProductRepository } from '../repositories/MySQLProductRepository';

export class ProductService {
  private productRepository: MySQLProductRepository;

  constructor() {
    this.productRepository = new MySQLProductRepository();
  }

  public async createProduct(productData: {
    restaurantId: number;
    name: string;
    description: string;
    available: boolean;
    price: number;
    type: 'FOOD' | 'DRINK';         
    preparationTime?: number;      
    packaging?: number;           
    capacity?: number;            
    alcoholic?: boolean;            
  }): Promise<Product> {
    
    let productToSave: Product;

    if (productData.type === 'FOOD') {
      if (productData.preparationTime === undefined) {
        throw new Error('O tempo de preparo é obrigatório para alimentos.');
      }

      productToSave = new Food(
        0, 
        productData.name,
        productData.description,
        productData.available ?? true,
        productData.price,
        productData.preparationTime,
        productData.packaging ?? 0
      );
    } 
    else if (productData.type === 'DRINK') {
      if (productData.capacity === undefined || productData.alcoholic === undefined) {
        throw new Error('Capacidade e indicação alcoólica são obrigatórias para bebidas.');
      }

      productToSave = new Drink(
        0,
        productData.name,
        productData.description,
        productData.available ?? true,
        productData.price,
        productData.capacity,
        productData.alcoholic
      );
    } 
    else {
      throw new Error('Tipo de produto inválido. Use "FOOD" ou "DRINK".');
    }

    await this.productRepository.save(productData.restaurantId, productToSave);
    return productToSave;
  }

  public async getProductsByRestaurant(restaurantId: number): Promise<Product[]> {
    return await this.productRepository.findByRestaurantId(restaurantId);
  }

  public async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new Error('Produto não encontrado.');
    }
    return product;
  }

  public async updateProduct(id: number, productData: {
    name?: string;
    description?: string;
    available?: boolean;
    price?: number;
  }): Promise<void> {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new Error('Produto não encontrado.');
    }

    
    const updatedName = productData.name ?? existingProduct.name;
    const updatedDescription = productData.description ?? existingProduct.description;
    const updatedAvailable = productData.available ?? existingProduct.available;
    const updatedPrice = productData.price ?? existingProduct.price;

    if (updatedPrice <= 0) {
      throw new Error('O preço do produto deve ser maior que zero.');
    }


    existingProduct.name = updatedName; 
    
    await this.productRepository.update(id, existingProduct);
  }
}