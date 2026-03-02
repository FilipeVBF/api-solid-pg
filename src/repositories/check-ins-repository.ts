import type { Prisma, CheckIn } from "../../generated/prisma/client.js";

export interface CheckInsRepository {
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
