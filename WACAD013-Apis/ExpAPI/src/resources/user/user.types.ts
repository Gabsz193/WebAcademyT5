export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    userTypeId: string;
    createdAt: Date;
    updatedAt: Date;
};

export type CreateUserDTO = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export type ReadUserDTO = Pick<User, 'id'>

export type UpdateUserDTO = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>;
