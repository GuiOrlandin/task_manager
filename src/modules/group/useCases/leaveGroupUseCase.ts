import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupRepository } from '../repositories/groupRepository';
import { User } from 'src/modules/user/entities/User';

interface LeaveGroupRequest {
  user: User;
  groupId: string;
}

@Injectable()
export class LeaveGroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute({ user, groupId }: LeaveGroupRequest) {
    const group = await this.groupRepository.findById(groupId);

    if (!group) {
      throw new NotFoundException();
    }

    await this.groupRepository.leaveGroup(user, group.id);
  }
}
