import { hash } from 'bcrypt';
import { makeUser } from '../../../modules/user/factories/userFactory';
import { CreateGroupUseCase } from './createGroupUseCase';
import { GroupRepositoryInMemory } from '../repositories/groupRepositoryInMemory';
import { CreateSubGroupUseCase } from './createSubGroupUseCase';

let createGroupUseCase: CreateGroupUseCase;
let createSubGroupUseCase: CreateSubGroupUseCase;
let groupRepositoryInMemory: GroupRepositoryInMemory;

describe('Create subgroup', () => {
  beforeEach(() => {
    groupRepositoryInMemory = new GroupRepositoryInMemory();
    createSubGroupUseCase = new CreateSubGroupUseCase(groupRepositoryInMemory);
    createGroupUseCase = new CreateGroupUseCase(groupRepositoryInMemory);
  });

  it('Should be able to created a subgroup', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password_hash: await hash(userPasswordWithoutEncryption, 10),
    });

    const group = await createGroupUseCase.execute({
      founder_id: user.id,
      name: 'Grupo de teste',
      password: '123456',
    });

    const subGroup = await createSubGroupUseCase.execute({
      groupId: group.id,
      name: 'teste subGroup',
    });

    expect(group.subGroups).toEqual([subGroup]);
  });
});
