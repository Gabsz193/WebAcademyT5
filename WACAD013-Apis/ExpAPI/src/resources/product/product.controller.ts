import {Request, Response} from 'express'
import { getProducts } from "./product.service";

const index = async (req: Request, res: Response) => {
    const products = await getProducts();

    res.json({ products });
}
const create = (req: Request, res: Response) => {}
const read = (req: Request, res: Response) => {}
const update = (req: Request, res: Response) => {}
const remove = (req: Request, res: Response) => {}

export default { index, create, read, update, remove };