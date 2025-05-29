import { Request, Response } from "express";
import {
  createProduct,
  getProducts,
  removeProduct,
  updateProduct
} from "../utils/fetch";
import { isProduto, isProdutoNoID } from "../utils/validate";

function notAllowedMethodMessage(
  req: Request,
  res: Response,
  allowedMethods: string[]
) {
  res.set("Allow", allowedMethods);

  res.status(405).json({
    error: "Method not allowed",
    message: `O método ${req.method} não está permitido`,
    allowedMethod: allowedMethods
  });
}

/**
 * GET: Renderiza a tela principal com todos os produtos
 */
async function index(req: Request, res: Response) {
  if (req.method === "GET") {
    try {
      const products = await getProducts();

      res.render("product/index", {
        layout: "main2",
        products: products.data
      });
    } catch (e) {
      const error_message = (e as Error).message;
      console.log(error_message);
      res.render("product/index", {
        layout: "main2",
        products: [],
        error: true
      });
    }
  } else {
    notAllowedMethodMessage(req, res, ["GET"]);
  }
}

/**
 * GET: Renderiza a tela de criar produto
 * POST: Cria um novo produto
 */
async function create(req: Request, res: Response) {
  switch (req.method) {
    case "GET":
      res.render("product/create", {
        layout: "main2"
      });
      break;
    case "POST": {
      const produto: unknown = req.body;

      if (isProdutoNoID(produto)) {
        try {
          const created_product = await createProduct(produto);

          res.status(201).json({
            success: true,
            message: "Produto criado com sucesso",
            data: created_product.data
          });
        } catch (e) {
          const error_message = (e as Error).message;

          res.status(500).json({
            success: false,
            message: error_message
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Dados do produto são inválidos"
        });
      }
      break;
    }
    default:
      notAllowedMethodMessage(req, res, ["GET", "POST"]);
      break;
  }
}

/**
 * GET: Pega as informações do produto
 */
async function read(req: Request, res: Response) {
  const id = req.params.id;

  const product = await getProducts(id);

  if (req.method === "GET") {
    res.render("product/show", {
      layout: "main2",
      product: product.data
    });
  } else {
    notAllowedMethodMessage(req, res, ["GET"]);
  }
}

/**
 * GET: Renderiza a tela de modificar produto
 * PUT: Modifica um produto
 */
async function update(req: Request, res: Response) {
  const id = req.params.id;

  switch (req.method) {
    case "GET": {
      const product = await getProducts(id);

      res.render("product/update", {
        layout: "main2",
        product: product.data
      });
      break;
    }
    case "PUT": {
      const produto: unknown = req.body;

      if (isProduto(produto)) {
        try {
          await updateProduct(produto);
          res.status(201).json({
            success: true,
            message: "Produto atualizado com sucesso"
          });
        } catch (e) {
          const error_message = (e as Error).message;

          res.status(500).json({
            success: false,
            message: error_message
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Dados do produto são inválidos"
        });
      }
      break;
    }
    default: {
      notAllowedMethodMessage(req, res, ["GET", "PUT"]);
      break;
    }
  }
}

/**
 * DELETE: Remove um produto
 */
async function remove(req: Request, res: Response) {
  const id = req.params.id;

  switch (req.method) {
    case "GET": {
      const product = await getProducts(id);

      res.render("product/delete", {
        layout: "main2",
        product: product.data
      });
      break;
    }
    case "DELETE": {
      try {
        await removeProduct(id);
        res.status(200).json({
          success: true,
          message: "Produto removido com sucesso"
        });
      } catch (e) {
        const error_message = (e as Error).message;

        res.status(500).json({
          success: false,
          message: error_message
        });
      }
      break;
    }
    default: {
      notAllowedMethodMessage(req, res, ["GET", "DELETE"]);
      break;
    }
  }
}

export default {
  index,
  create,
  read,
  update,
  remove
};
