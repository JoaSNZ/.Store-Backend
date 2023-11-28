import express from 'express';
import { AppDataSource } from './persistance/db';
import { mainRouter } from './router/routes';
import { Product } from './persistance/product'
import { User } from './persistance/user';
import  cors from 'cors';

const app = express();
const port = 8080;

app.use(function(_, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origins, X-Requested-With, Content-Type, Accept");
    next();
})
    
app.use(express.json());
app.use ('/' , mainRouter);
app.use (cors());


AppDataSource.initialize()
    .then(async() => {
        console.log('Base de datos conectada');

//productos
        const validation_product = AppDataSource.manager.getRepository(Product)
        const product_exist = await validation_product.find()
        if (product_exist.length == 0){
            const product1 = new Product('https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',"Zapatos Nike", 80, 1);
            const product2 = new Product('https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80', "Reloj", 50, 1);
            const product3 = new Product('https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80', "Smartwatch", 90, 1);
            const product4 = new Product('https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', "Perfume", 50, 1);
            const product5 = new Product('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', "Audífonos", 20, 1);
            AppDataSource.manager.save([product1, product2, product3, product4,product5])
            console.log(product_exist)
        }

//usuario
        const validation_user = AppDataSource.manager.getRepository(User)
        const user_exist = await validation_user.find()
        if (user_exist.length == 0){
            const user1 = new User("prueba123" , "prueba@gmail.com", "12345678", "12345678")
            AppDataSource.manager.save([user1])
            console.log(user_exist)
        }
        app.listen(port, () => {
            console.log(`Servidor: http://localhost:${port}`);
        });
    })
    .catch(err => {
        throw err
    });

