import { hash } from 'bcrypt';
import { makeUser } from '../../../modules/user/factories/userFactory';
import { CreateGroupUseCase } from './createGroupUseCase';
import { GroupRepositoryInMemory } from '../repositories/groupRepositoryInMemory';
import { JoinGroupUseCase } from './joinTheGroupUseCase';
import { NotFoundException } from '@nestjs/common';
import { LeaveGroupUseCase } from './leaveGroupUseCase';

let createGroupUseCase: CreateGroupUseCase;
let joinGroupUseCase: JoinGroupUseCase;
let leaveGroupUseCase: LeaveGroupUseCase;
let groupRepositoryInMemory: GroupRepositoryInMemory;

describe('Leave group', () => {
  beforeEach(() => {
    groupRepositoryInMemory = new GroupRepositoryInMemory();
    joinGroupUseCase = new JoinGroupUseCase(groupRepositoryInMemory);
    leaveGroupUseCase = new LeaveGroupUseCase(groupRepositoryInMemory);
    createGroupUseCase = new CreateGroupUseCase(groupRepositoryInMemory);
  });

  it('Should be able to leave group', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password_hash: await hash(userPasswordWithoutEncryption, 10),
    });

    const group = await createGroupUseCase.execute({
      founder_id: user.id,
      name: 'Grupo de teste',
      password: '123456',
    });

    await joinGroupUseCase.execute({
      user,
      groupId: group.id,
      password: '123456',
    });

    await leaveGroupUseCase.execute({
      user,
      groupId: group.id,
    });

    expect(group.members).toEqual([]);
  });
  it('Should not be able to leave group with wrong community Id', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password_hash: await hash(userPasswordWithoutEncryption, 10),
    });

    const group = await createGroupUseCase.execute({
      founder_id: user.id,
      name: 'Grupo de teste',
      password: '123456',
    });

    await joinGroupUseCase.execute({
      user,
      groupId: group.id,
      password: '123456',
    });

    await expect(
      leaveGroupUseCase.execute({
        user,
        groupId: 'group.id',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
