import {Request, Response} from 'express';
import {createUser, findUserByEmail} from "../user/user.service";
import {StatusCodes} from 'http-status-codes'
import {checkAuth} from "./auth.service";
import {loginSchema, signupSchema} from './auth.schema';

const signup = async (req: Request, res: Response) => {
  /* 
  #swagger.summary = 'Cadastrar um novo usuário'
  #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/SignUpDTO' }
  }
  #swagger.responses[201] = {
      schema: { newUsuario: { $ref: '#/definitions/User' } }
  }
  #swagger.responses[400] = {
      schema: { msg: 'Email informado já está sendo usado' }
  }
  #swagger.responses[500] = {
      schema: { error: 'Mensagem de erro' }
  }
  */
  const {error, value: usuario} = signupSchema.validate(req.body);
  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({error: error.message});
  }

  try {
    if (await findUserByEmail(usuario.email)) {
      res
      .status(StatusCodes.BAD_REQUEST)
      .json({msg: "Email informado já está sendo usado"});
    }

    const newUsuario = await createUser(usuario);

    res.status(StatusCodes.CREATED).json({newUsuario});
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: (e as Error).message});
  }
}

const login = async (req: Request, res: Response) => {
  /* 
  #swagger.summary = 'Autenticar um usuário'
  #swagger.parameters['body'] = {
      in: 'body',
      schema: { $ref: '#/definitions/LoginDTO' }
  }
  #swagger.responses[200] = {
      schema: { msg: 'Usuário autenticado com sucesso' }
  }
  #swagger.responses[400] = {
      schema: { msg: 'Email e/ou senha incorretos' }
  }
  #swagger.responses[500] = {
      schema: { error: 'Mensagem de erro' }
  }
  */
  const {error, value: loginData} = loginSchema.validate(req.body);
  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({error: error.message});
  }
  const {email, password} = loginData;

  try {
    const usuario = await checkAuth({email, password});

    if (usuario === null) {
      res.status(StatusCodes.BAD_REQUEST).json({
        msg: 'Email e/ou senha incorretos'
      });
    } else {
      req.session.uid = usuario.id;
      res.status(StatusCodes.OK).json({ msg: 'Usuário autenticado com sucesso' });
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: (e as Error).message});
  }
}

const logout = async (req: Request, res: Response) => {
  /* 
  #swagger.summary = 'Fazer logout de um usuário'
  #swagger.responses[200] = {
      schema: { msg: 'Logout realizado com sucesso' }
  }
  */

}

export default {signup, login, logout};