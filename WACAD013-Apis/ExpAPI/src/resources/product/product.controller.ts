import {Request, Response} from 'express'
import {createProduct, deleteProduct, getProduct, getProducts, updateProduct} from "./product.service";
import {CreateProductDTO, Product, ReadProductDTO, UpdateProductDTO} from "./product.types";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

const index = async (req: Request, res: Response) => {
    const products = await getProducts();

    res.json({ products });
}
const create = async (req: Request, res: Response) => {
    const product = req.body as CreateProductDTO;

    let newProduct : Product;

    try {
        newProduct = await createProduct(product);
        res.status(StatusCodes.CREATED).json({ product: newProduct });
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: (e as Error).message });
    }

}
const read = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await getProduct(parseInt(id));

        if(product) {
            res.status(StatusCodes.OK).json(product);
        } else {
            res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        }


    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
    }



}
const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const productUpdate = req.body as UpdateProductDTO;

    try {
        const updatedProduct = await updateProduct(parseInt(id), productUpdate);

        if (updatedProduct) {
            res.status(StatusCodes.OK).json({product: updatedProduct});
        } else {
            res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        }
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({error: (e as Error).message});
    }

}
const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedProduct = await deleteProduct(parseInt(id));
        if(deletedProduct) {
            res.status(StatusCodes.OK).json({message: ReasonPhrases.OK});
        } else {
            res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        }
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({error: (e as Error).message});
    }
}

export default { index, create, read, update, remove };