import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupRepository } from '../repositories/groupRepository';
import { User } from 'src/modules/user/entities/User';

interface JoinGroupRequest {
  user: User;
  groupId: string;
  password?: string;
}

@Injectable()
export class JoinGroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute({ user, groupId, password }: JoinGroupRequest) {
    const group = await this.groupRepository.findById(groupId);

    if (!group) {
      throw new NotFoundException();
    }

    await this.groupRepository.joinGroup(user, group.id, password);
  }
}
