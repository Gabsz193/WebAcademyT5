import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { CreateUserDTO, User, UpdateUserDTO } from "./user.types";

let users: User[] = [];

export const getUsers = (): Promise<User[]> => {
    return new Promise<User[]>((resolve) => {
        resolve(users);
    });
};

export const getUser = (id: string): Promise<User | null> => {
    return new Promise<User | null>((resolve) => {
        const user = users.find(u => u.id === id);
        if (user) {
            resolve(user);
        } else resolve(null);
    });
};

export const createUser = (user: CreateUserDTO): Promise<User> => {
    return new Promise<User>((resolve) => {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user.password, salt);

        const now = new Date();
        const newUser: User = {
            id: uuidv4(),
            ...user,
            password: hashedPassword,
            userTypeId: '1',
            createdAt: now,
            updatedAt: now
        };
        users.push(newUser);

        const { password, ...userWithoutPassword } = newUser;
        resolve(userWithoutPassword as User);
    });
};

export const updateUser = (id: string, user: UpdateUserDTO): Promise<User | null> => {
    return new Promise<User | null>((resolve) => {
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex >= 0) {
            // Se houver uma nova senha, faça o hash dela
            if (user.password) {
                const salt = bcrypt.genSaltSync(10);
                user.password = bcrypt.hashSync(user.password, salt);
            }

            users[userIndex] = {
                ...users[userIndex],
                ...user,
                updatedAt: new Date()
            };

            const { password, ...userWithoutPassword } = users[userIndex];
            resolve(userWithoutPassword as User);
        } else {
            resolve(null);
        }
    });
};

export const deleteUser = (id: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex >= 0) {
            users.splice(userIndex, 1);
            resolve(true);
        }
        resolve(false);
    });
};
