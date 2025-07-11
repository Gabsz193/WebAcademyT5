import {Request, Response} from 'express';
import {createUser, deleteUser, getUser, getUsers, updateUser} from "./user.service";
import {CreateUserDTO, UpdateUserDTO, UserWithoutPassword} from "./user.types";
import {ReasonPhrases, StatusCodes} from "http-status-codes";

const index = async (req: Request, res: Response) => {
  /* 
  #swagger.summary = 'Listar todos os usuários'
  #swagger.responses[200] = {
      schema: { users: [{ $ref: '#/definitions/UserWithoutPassword' }] }
  }
  */
  const users = await getUsers();

  res.json({users});
};

const create = async (req: Request, res: Response) => {
  /* 
  #swagger.summary = 'Criar um novo usuário'
  #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/CreateUserDTO' }
  }
  #swagger.responses[201] = {
      schema: { user: { $ref: '#/definitions/UserWithoutPassword' } }
  }
  #swagger.responses[400] = {
      schema: { error: 'Mensagem de erro' }
  }
  */
  const user = req.body as CreateUserDTO;

  let newUser: UserWithoutPassword;

  try {
    newUser = await createUser(user);
    res.status(StatusCodes.CREATED).json({user: newUser});
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({error: (e as Error).message});
  }
};

const read = async (req: Request, res: Response) => {
  /* 
  #swagger.summary = 'Buscar um usuário pelo ID'
  #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do usuário',
      required: true,
      type: 'string'
  }
  #swagger.responses[200] = {
      schema: { $ref: '#/definitions/UserWithoutPassword' }
  }
  #swagger.responses[404] = {
      schema: 'Not Found'
  }
  #swagger.responses[400] = {
      schema: 'Bad Request'
  }
  */
  const {id} = req.params;

  try {
    const user = await getUser(id);

    if (user) {
      res.status(StatusCodes.OK).json(user);
    } else {
      res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST);
  }
};

const update = async (req: Request, res: Response) => {
  /* 
  #swagger.summary = 'Atualizar um usuário'
  #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do usuário',
      required: true,
      type: 'string'
  }
  #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/UpdateUserDTO' }
  }
  #swagger.responses[200] = {
      schema: { user: { $ref: '#/definitions/UserWithoutPassword' } }
  }
  #swagger.responses[404] = {
      schema: 'Not Found'
  }
  #swagger.responses[400] = {
      schema: { error: 'Mensagem de erro' }
  }
  */
  const {id} = req.params;
  const userUpdate = req.body as UpdateUserDTO;

  try {
    const updatedUser = await updateUser(id, userUpdate);

    if (updatedUser) {
      res.status(StatusCodes.OK).json({user: updatedUser});
    } else {
      res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({error: (e as Error).message});
  }
};

const remove = async (req: Request, res: Response) => {
  /* 
  #swagger.summary = 'Remover um usuário'
  #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do usuário',
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
  const {id} = req.params;

  try {
    const deletedUser = await deleteUser(id);
    if (deletedUser) {
      res.status(StatusCodes.OK).json({message: ReasonPhrases.OK});
    } else {
      res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json({error: (e as Error).message});
  }
};

export default {index, create, read, update, remove};
