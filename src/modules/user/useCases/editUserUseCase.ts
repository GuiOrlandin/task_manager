import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/userRepository";

import { UserNotFoundException } from "../exceptions/userNotFound";
import { UserWithoutPermissionException } from "../exceptions/userWithoutPermission";

interface EditUserRequest {
  name?: string;
  avatarUrl?: string | null;
  user_id: string;
}

@Injectable()
export class EditUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ avatarUrl, name, user_id }: EditUserRequest) {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.id !== user_id) {
      throw new UserWithoutPermissionException({
        actionName: "editar",
      });
    }

    if (avatarUrl && name) {
      user.avatar = avatarUrl;
      user.name = name;
    }
    if (avatarUrl && !name) {
      user.avatar = avatarUrl;
    }
    if (!avatarUrl && name) {
      user.name = name;
    }

    await this.userRepository.save(user);

    return user;
  }
}
