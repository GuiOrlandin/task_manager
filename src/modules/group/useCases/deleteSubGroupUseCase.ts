import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupRepository } from '../repositories/groupRepository';

interface DeleteSubGroupRequest {
  subGroupId: string;
  groupId: string;
}

@Injectable()
export class DeleteSubGroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute({ subGroupId, groupId }: DeleteSubGroupRequest) {
    await this.groupRepository.deleteSubGroup(subGroupId, groupId);
  }
}
