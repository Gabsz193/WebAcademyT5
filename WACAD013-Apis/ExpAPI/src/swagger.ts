import dotenv from 'dotenv';
import swaggerAutogen from 'swagger-autogen';
import {cleanEnv, port, str} from 'envalid';

dotenv.config();

const validateEnv = () => {
  return cleanEnv(process.env, {
    PORT: port(),
    HOST: str(),
  });
};

validateEnv();

const doc = {
  info: {
    title: 'API da Loja Virtual',
    description: 'Documentação da Loja Virtual para servir de nota no WebAcademy - Módulo de Restful API\'s'
  },
  definitions: {
    Product: {
      id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      name: "Modern Soft Sausages",
      price: 2699.0,
      stockQuantity: 9,
      createdAt: "2023-11-07T19:27:15.645Z",
      updatedAt: "2023-11-07T19:27:15.645Z",
    },
    CreateProductDTO: {
      name: "Modern Soft Sausages",
      price: "2699.0",
      stockQuantity: "9"
    },
    UpdateProductDTO: {
      name: "Modern Soft Sausages",
      price: "2699.0",
      stockQuantity: "9"
    },
    CartItem: {
      productId: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      quantity: 2,
      product: {
        $ref: "#/definitions/Product"
      }
    },
    Cart: [
      {
        $ref: "#/definitions/CartItem"
      }
    ],
    AddToCartDTO: {
      productId: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      quantity: 2
    },
    CompraItem: {
      id: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      compraId: "9b3053de-5d92-4c43-97c0-c9b2b0d56704",
      productId: "8a2053de-5d92-4c43-97c0-c9b2b0d56703",
      quantity: 2,
      discount: 10.5,
      createdAt: "2023-11-07T19:27:15.645Z",
      updatedAt: "2023-11-07T19:27:15.645Z",
      product: {
        $ref: "#/definitions/Product"
      }
    },
    Compra: {
      id: "9b3053de-5d92-4c43-97c0-c9b2b0d56704",
      userId: "7c3053de-5d92-4c43-97c0-c9b2b0d56705",
      items: [
        {
          $ref: "#/definitions/CompraItem"
        }
      ],
      createdAt: "2023-11-07T19:27:15.645Z",
      updatedAt: "2023-11-07T19:27:15.645Z"
    },
    SignUpDTO: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123"
    },
    LoginDTO: {
      email: "john.doe@example.com",
      password: "password123"
    },
    User: {
      id: "7c3053de-5d92-4c43-97c0-c9b2b0d56705",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "hashedpassword",
      userTypeId: "6d3053de-5d92-4c43-97c0-c9b2b0d56706",
      userType: {
        id: "6d3053de-5d92-4c43-97c0-c9b2b0d56706",
        label: "Customer"
      },
      createdAt: "2023-11-07T19:27:15.645Z",
      updatedAt: "2023-11-07T19:27:15.645Z"
    },
    UserWithoutPassword: {
      id: "7c3053de-5d92-4c43-97c0-c9b2b0d56705",
      name: "John Doe",
      email: "john.doe@example.com",
      userTypeId: "6d3053de-5d92-4c43-97c0-c9b2b0d56706",
      userType: {
        id: "6d3053de-5d92-4c43-97c0-c9b2b0d56706",
        label: "Customer"
      },
      createdAt: "2023-11-07T19:27:15.645Z",
      updatedAt: "2023-11-07T19:27:15.645Z"
    },
    CreateUserDTO: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
      userTypeId: "6d3053de-5d92-4c43-97c0-c9b2b0d56706"
    },
    UpdateUserDTO: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123"
    }
  },
  host: `${process.env.HOST}:${process.env.PORT}`
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/router/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc)