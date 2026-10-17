import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { MySQLProductRepository } from "../repositories/MySQLProductRepository";

export class ProductController {
    private productService: ProductService;
    private productRepository: MySQLProductRepository;

    constructor() {
        this.productService = new ProductService();
        this.productRepository = new MySQLProductRepository();
    }

    public creatProduct = async (req: Request, res: Response): Promise<Response> => {
        try {
            const newProduct = await this.productService.createProduct(req.body);

            return res.status(201).json({
                message: 'Produto registado com sucesso!',
                product: {
                    name: newProduct.name,
                    description: newProduct.description,
                    price: newProduct.price,
                    category: newProduct.obterCategoria() // Corrigido para método com parênteses
                }
            });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    public getProductsByRestaurant = async (req: Request, res: Response): Promise<Response> => {
        try {
            const restaurantId = Number(req.params.restaurantId);
            const products = await this.productService.getProductsByRestaurant(restaurantId);

            return res.status(200).json(products);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    public getProductById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = Number(req.params.id);
            const product = await this.productService.getProductById(id);

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado.' });
            }
            return res.status(200).json(product); 
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }

    
    public update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = Number(req.params.id);
            await this.productService.updateProduct(id, req.body);

            return res.status(200).json({ message: 'Produto atualizado com sucesso!' });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}