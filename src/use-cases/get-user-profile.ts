import type { UserRepository } from "@/repositories/users-repository.js";
import type { User } from "../../generated/prisma/client.js";
import { compare } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
