import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GroupRepository } from '../repositories/groupRepository';

interface DeleteGroupRequest {
  group_id: string;
  user_id: string;
}

@Injectable()
export class DeleteGroupUseCase {
  constructor(private groupRepository: GroupRepository) {}

  async execute({ group_id, user_id }: DeleteGroupRequest) {
    const group = await this.groupRepository.findById(group_id);

    if (!group) {
      throw new NotFoundException();
    }

    if (group.founder_id !== user_id) {
      throw new UnauthorizedException();
    }

    await this.groupRepository.delete(group_id);
  }
}
