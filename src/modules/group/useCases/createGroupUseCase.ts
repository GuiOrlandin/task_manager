import { Injectable } from '@nestjs/common';
import { GroupRepository } from '../repositories/groupRepository';
import { Group } from '../entities/group';

interface CreatedGroupRequest {
  founder_id: string;
  name: string;
  password?: string;
}

@Injectable()
export class CreateGroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute({ founder_id, name, password }: CreatedGroupRequest) {
    const group = new Group({
      founder_id,
      name,
      password,
    });

    await this.groupRepository.create(group);

    return group;
  }
}
