import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js";
import { SearchGymUseCase } from "../search-gym.js";

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymUseCase(gymsRepository);

  return useCase;
}
