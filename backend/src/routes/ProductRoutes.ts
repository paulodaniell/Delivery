import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();
const productController = new ProductController();

router.post('/create', productController.creatProduct);
router.get('/restaurant/:restaurantId', productController.getProductsByRestaurant); 
router.get('/:id', productController.getProductById);                              
router.put('/:id', productController.update);                                      

export default router;