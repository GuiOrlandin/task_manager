import { hash } from 'bcrypt';
import { makeUser } from '../../../modules/user/factories/userFactory';
import { CreateGroupUseCase } from './createGroupUseCase';
import { GroupRepositoryInMemory } from '../repositories/groupRepositoryInMemory';
import { JoinGroupUseCase } from './joinTheGroupUseCase';
import { NotFoundException } from '@nestjs/common';

let createGroupUseCase: CreateGroupUseCase;
let joinGroupUseCase: JoinGroupUseCase;
let groupRepositoryInMemory: GroupRepositoryInMemory;

describe('Join group', () => {
  beforeEach(() => {
    groupRepositoryInMemory = new GroupRepositoryInMemory();
    joinGroupUseCase = new JoinGroupUseCase(groupRepositoryInMemory);
    createGroupUseCase = new CreateGroupUseCase(groupRepositoryInMemory);
  });

  it('Should be able to join group', async () => {
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

    expect(group.members).toEqual([user]);
  });
  it('Should not be able to join group with wrong community Id', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password_hash: await hash(userPasswordWithoutEncryption, 10),
    });

    await expect(
      joinGroupUseCase.execute({
        user,
        groupId: 'group.id',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
  it('Should not be able to join group two times', async () => {
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
      joinGroupUseCase.execute({
        user,
        groupId: group.id,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
