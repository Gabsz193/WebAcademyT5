import { PrismaClient } from '@prisma/client';
import { CreateUserDTO, User, UpdateUserDTO, UserWithoutPassword } from "./user.types";
import { UserTypes } from '../userType/userType.constants';
import { encryptPassword } from '../../utils/password.util';

const prisma = new PrismaClient();

export const getUsers = async (): Promise<UserWithoutPassword[]> => {
    const users = await prisma.user.findMany({});

    return users.map(user => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
};

export const getUser = async (id: string): Promise<UserWithoutPassword | null> => {
    const user = await prisma.user.findUnique({
        where: { id }
    });

    if (!user) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const createUser = async (user: CreateUserDTO): Promise<UserWithoutPassword> => {
    const hashedPassword = encryptPassword(user.password);

    const newUser = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: hashedPassword,
            userTypeId: UserTypes.CLIENT
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};

export const updateUser = async (id: string, user: UpdateUserDTO): Promise<UserWithoutPassword | null> => {
    try {
        // Prepare update data
        const updateData: any = {};

        if (user.name) updateData.name = user.name;
        if (user.email) updateData.email = user.email;
        if (user.password) updateData.password = encryptPassword(user.password);

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    } catch (error) {
        // If the record doesn't exist, Prisma will throw an error
        return null;
    }
};

export const deleteUser = async (id: string): Promise<boolean> => {
    try {
        await prisma.user.delete({
            where: { id }
        });
        return true;
    } catch (error) {
        // If the record doesn't exist, Prisma will throw an error
        return false;
    }
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: { email }
    });
}