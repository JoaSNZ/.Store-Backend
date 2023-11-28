import { Response, Request } from 'express'
import { AppDataSource, db, Producto} from '../persistance/db';
import { Product } from '../persistance/product';
import { User } from '../persistance/user';


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

    const username = formData.usuario;
    const email = formData.email;
    const password = formData.password;

    try {
            const newUser = new User(username, email, password, password);

            try {
                await AppDataSource.manager.save(newUser);

                return res.status(201).json({ message: 'Te registraste' });
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                return res.status(400).json({ error: 'Error al conectar con la base de datos' });
            }
        } catch (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }  
};


export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await AppDataSource.manager.findOne(User, { where: { email, password } });
    if (user) {
        res.json({
            success: true,
            msg: "Logged",
        });       
    } else {
        res.status(401).json({
            success: false,
            msg: "Failed to log in"
        })
    }
}