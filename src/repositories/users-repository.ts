import type { Prisma, User } from "../../generated/prisma/client.js";

 export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>
 }