import { Response, Request } from 'express'
import { AppDataSource, db, Producto} from '../persistance/db';
import { Product } from '../persistance/product';
import { User } from '../persistance/user';
import { Cart } from '../persistance/carrito';


export const getProducts = async (_: Request, res: Response) => {
    const products = await AppDataSource.manager.find(Product);
    res.json(products);
}

export const addProductsToDB = async () => {
    db.map(async (p: Producto) => {
        const newProduct = new Product(p.img, p.name, p.price, p.quantity);
        await AppDataSource.manager.save(newProduct);
    });
}

export const addUserToDB = async (req: Request, res: Response) => {
    const { formData } = req.body;
    const username = formData.username;
    const email = formData.email;
    const password = formData.password;
    const password2 = formData.password2;

    try {
            const newUser = new User(username, email, password, password2);

            try {
                await AppDataSource.manager.save(newUser);

                return res.status(201).json({ message: 'Te registraste' });
            } catch (error) {
                console.error('Error al registrarse:', error);
                return res.status(401).json({ error: 'Error' });
            }
        } catch (err) {
        console.error('Error al registrarse:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }  
};


export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await AppDataSource.manager.findOne(User, { where: { email, password } });
    if (user) {
        res.json({
            success: true,
            msg: "Iniciaste sesión",
        });       
    } else {
        res.status(401).json({
            success: false,
            msg: "Error al iniciar sesión"
        })
    }
}

export const addCartToDB = async (req: Request, res: Response) => {
    
    const { jsonifiedCart } = req.body;

    try {

        const cartEntity = new Cart(jsonifiedCart);

        await AppDataSource.manager.save(Cart, cartEntity);

        return res.status(201).json({ message: 'Carrito registrado' });

    } catch (err) {
        console.error('Error al registrar el carrito:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }  
};
