import { hash } from 'bcrypt';
import { makeUser } from '../../../modules/user/factories/userFactory';
import { CreateGroupUseCase } from './createGroupUseCase';
import { GroupRepositoryInMemory } from '../repositories/groupRepositoryInMemory';

let createGroupUseCase: CreateGroupUseCase;
let groupRepositoryInMemory: GroupRepositoryInMemory;

describe('Create group', () => {
  beforeEach(() => {
    groupRepositoryInMemory = new GroupRepositoryInMemory();
    createGroupUseCase = new CreateGroupUseCase(groupRepositoryInMemory);
  });

  it('Should be able to created a group', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password_hash: await hash(userPasswordWithoutEncryption, 10),
    });

    const group = await createGroupUseCase.execute({
      founder_id: user.id,
      name: 'Grupo de teste',
      password: '123456',
    });

    expect(groupRepositoryInMemory.groups).toEqual([group]);
  });
});
