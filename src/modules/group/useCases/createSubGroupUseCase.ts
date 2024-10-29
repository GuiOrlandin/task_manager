import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupRepository } from '../repositories/groupRepository';
import { SubGroup } from '../entities/subGroup';

interface CreatedSubGroupRequest {
  name: string;
  groupId: string;
}

@Injectable()
export class CreateSubGroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute({ name, groupId }: CreatedSubGroupRequest) {
    const group = await this.groupRepository.findById(groupId);

    if (!group) {
      throw new NotFoundException();
    }

    const subGroup = new SubGroup({
      name,
      group_id: groupId,
    });

    await this.groupRepository.createSubGroup(subGroup);

    return subGroup;
  }
}
