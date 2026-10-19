import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const productController = new ProductController();

router.post('/create',authMiddleware, productController.creatProduct);
router.get('/restaurant/:restaurantId', productController.getProductsByRestaurant); 
router.get('/:id', productController.getProductById);                              
router.put('/:id',authMiddleware, productController.update);                                      

export default router;