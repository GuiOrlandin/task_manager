import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/userRepository";

interface FindUserByEmailRequest {
  email: string;
}

@Injectable()
export class FindUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email }: FindUserByEmailRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
