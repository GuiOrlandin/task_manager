import { User } from 'src/modules/user/entities/User';
import { Group } from '../entities/group';
import { SubGroup } from '../entities/subGroup';

export interface GroupResponseRequest {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  key_access?: string;
  members: User[];
  founder_id: string;
  subGroups?: Group[];
}

export abstract class GroupRepository {
  abstract create(group: Group): Promise<void>;
  abstract createSubGroup(subGroup: SubGroup): Promise<void>;
  abstract deleteSubGroup(subGroupId: string, groupId: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Group | null>;
  abstract joinGroup(
    user: User,
    groupId: string,
    password?: string,
  ): Promise<void>;
  abstract leaveGroup(user: User, groupId: string): Promise<void>;
}
