export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    userTypeId: string;
    userType?: {
        id: string;
        label: string;
    };
    createdAt: Date;
    updatedAt: Date;
};

export type UserWithoutPassword = Omit<User, 'password'>;

export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;
    userTypeId: string;
};

export type ReadUserDTO = Pick<User, 'id'>

export type UpdateUserDTO = Partial<{
    name: string;
    email: string;
    password: string;
}>;
