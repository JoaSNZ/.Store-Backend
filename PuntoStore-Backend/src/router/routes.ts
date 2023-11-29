import express from 'express';
import { addCartToDB, addProductsToDB, addUserToDB, getProducts, loginUser } from '../controler/controler';
const mainRouter = express.Router();

mainRouter.get('/', (_, res) => {
    res.send('Hola');
});

mainRouter.get('/producto', getProducts);
mainRouter.post('/producto/:añadir', addProductsToDB);
mainRouter.post('/registro', addUserToDB);
mainRouter.post('/login', loginUser)
mainRouter.post('/carrito', addCartToDB)

export { mainRouter };  