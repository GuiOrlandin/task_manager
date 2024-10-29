import { User } from 'src/modules/user/entities/User';
import { Group } from '../entities/group';
import { GroupRepository } from './groupRepository';
import { SubGroup } from '../entities/subGroup';
import { NotFoundException } from '@nestjs/common';

export class GroupRepositoryInMemory implements GroupRepository {
  public groups: Group[] = [];

  async create(group: Group): Promise<void> {
    this.groups.push(group);
  }

  async findById(id: string): Promise<Group> {
    const group = this.groups.find((group) => group.id === id);

    if (!group) {
      return null;
    }

    return group;
  }

  async save(group: Group): Promise<void> {
    const groupIndex = this.groups.findIndex(
      (currentGroup) => currentGroup.id === group.id,
    );

    if (groupIndex >= 0) {
      this.groups[groupIndex] = group;
    }
  }

  async delete(id: string): Promise<void> {
    this.groups = this.groups.filter((group) => group.id !== id);
  }

  async joinGroup(
    user: User,
    groupId: string,
    password?: string,
  ): Promise<void> {
    const group = this.groups.find((group) => group.id === groupId);

    if (!group) {
      throw new Error('o grupo não existe!');
    }

    if (group.password !== password) {
      throw new Error('Senha incorreta!');
    }

    const isMember = group.members.find((member) => member.id === user.id);

    if (isMember) {
      throw new Error('Você já é membro do grupo!');
    }

    if (group.password === password) {
      group.addUser(user);
    }
  }

  async leaveGroup(user: User, groupId: string): Promise<void> {
    const group = this.groups.find((group) => group.id === groupId);

    const groupIndex = this.groups.findIndex((group) => group.id === groupId);

    if (!group) {
      throw new Error('O grupo não existe!');
    }

    const isMember = group.members.find((member) => member.id === user.id);

    if (!isMember) {
      throw new Error('Não faz parte do grupo!');
    }

    group.removeUser(user.id);

    this.groups[groupIndex] = group;
  }

  async createSubGroup(subGroup: SubGroup): Promise<void> {
    const group = this.groups.find((group) => subGroup.group_id === group.id);

    if (!group) {
      throw new NotFoundException();
    }

    group.subGroups.push(subGroup);
  }

  async deleteSubGroup(subGroupId: string, groupId: string): Promise<void> {
    const group = this.groups.find((group) => group.id === groupId);
    const groupIndex = this.groups.findIndex((group) => group.id === groupId);

    if (groupIndex === -1) {
      throw new NotFoundException('Group not found');
    }

    if (!group) {
      throw new NotFoundException();
    }

    group.deleteSubGroup(subGroupId);
  }
}
