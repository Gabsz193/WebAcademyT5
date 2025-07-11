import {Request, Response} from 'express'
import {createProduct, deleteProduct, getProduct, getProducts, updateProduct} from "./product.service";
import {CreateProductDTO, Product, UpdateProductDTO} from "./product.types";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

const index = async (req: Request, res: Response) => {
    /* 
    #swagger.summary = 'Listar todos os produtos'
    #swagger.responses[200] = {
        schema: { products: [{ $ref: '#/definitions/Product' }] }
    }
    */
    const products = await getProducts();

    res.json({ products });
}
const create = async (req: Request, res: Response) => {
    /* 
    #swagger.summary = 'Criar um novo produto'
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/CreateProductDTO' }
    }
    #swagger.responses[201] = {
        schema: { product: { $ref: '#/definitions/Product' } }
    }
    #swagger.responses[400] = {
        schema: { error: 'Mensagem de erro' }
    }
    */
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
    /* 
    #swagger.summary = 'Buscar um produto pelo ID'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do produto',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        schema: { $ref: '#/definitions/Product' }
    }
    #swagger.responses[404] = {
        schema: 'Not Found'
    }
    #swagger.responses[400] = {
        schema: 'Bad Request'
    }
    */
    const { id } = req.params;

    try {
        const product = await getProduct(id);

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
    /* 
    #swagger.summary = 'Atualizar um produto'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do produto',
        required: true,
        type: 'string'
    }
    #swagger.parameters['body'] = {
        in: 'body',
        schema: { $ref: '#/definitions/UpdateProductDTO' }
    }
    #swagger.responses[200] = {
        schema: { product: { $ref: '#/definitions/Product' } }
    }
    #swagger.responses[404] = {
        schema: 'Not Found'
    }
    #swagger.responses[400] = {
        schema: { error: 'Mensagem de erro' }
    }
    */
    const { id } = req.params;
    const productUpdate = req.body as UpdateProductDTO;

    try {
        const updatedProduct = await updateProduct(id, productUpdate);

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
    /* 
    #swagger.summary = 'Remover um produto'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'ID do produto',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
        schema: { message: 'OK' }
    }
    #swagger.responses[404] = {
        schema: 'Not Found'
    }
    #swagger.responses[400] = {
        schema: { error: 'Mensagem de erro' }
    }
    */
    const { id } = req.params;

    try {
        const deletedProduct = await deleteProduct(id);
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