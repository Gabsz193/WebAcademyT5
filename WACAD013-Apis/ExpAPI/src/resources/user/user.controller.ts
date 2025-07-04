import { Request, Response } from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./user.service";
import { CreateUserDTO, User, UpdateUserDTO } from "./user.types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const index = async (req: Request, res: Response) => {
    const users = await getUsers();

    res.json({ users });
};

const create = async (req: Request, res: Response) => {
    const user = req.body as CreateUserDTO;

    let newUser: User;

    try {
        newUser = await createUser(user);
        res.status(StatusCodes.CREATED).json({ user: newUser });
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: (e as Error).message });
    }
};

const read = async (req: Request, res: Response) => {
    const { id } = req.params;

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
    const { id } = req.params;
    const userUpdate = req.body as UpdateUserDTO;

    try {
        const updatedUser = await updateUser(id, userUpdate);

        if (updatedUser) {
            res.status(StatusCodes.OK).json({ user: updatedUser });
        } else {
            res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        }
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: (e as Error).message });
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedUser = await deleteUser(id);
        if (deletedUser) {
            res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
        } else {
            res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
        }
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: (e as Error).message });
    }
};

export default { index, create, read, update, remove };
