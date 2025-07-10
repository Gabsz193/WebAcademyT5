import {User} from "../user/user.types";
import {LoginDTO} from "./auth.types";
import bcrypt from 'bcryptjs'
import {findUserByEmail} from "../user/user.service";
import { PrismaClient } from "@prisma/client";
import {UserTypes} from "../userType/userType.constants";

const prisma = new PrismaClient();

export const checkAuth = async (
  credentials: LoginDTO
): Promise<User | null> => {
  const {email, password} = credentials;
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) return null;
  return user;
}

export const checkIsAdmin = async (id: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: {id},
    include: {userType: true}
  });

  return user?.userType.id === UserTypes.ADMIN;
}