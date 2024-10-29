import { hash } from 'bcrypt';
import { makeUser } from '../../../modules/user/factories/userFactory';
import { CreateGroupUseCase } from './createGroupUseCase';
import { GroupRepositoryInMemory } from '../repositories/groupRepositoryInMemory';
import { DeleteGroupUseCase } from './deleteGroupUseCase';

let createGroupUseCase: CreateGroupUseCase;
let deleteGroupUseCase: DeleteGroupUseCase;
let groupRepositoryInMemory: GroupRepositoryInMemory;

describe('Delete group', () => {
  beforeEach(() => {
    groupRepositoryInMemory = new GroupRepositoryInMemory();
    deleteGroupUseCase = new DeleteGroupUseCase(groupRepositoryInMemory);
    createGroupUseCase = new CreateGroupUseCase(groupRepositoryInMemory);
  });

  it('Should be able to dele created group', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password_hash: await hash(userPasswordWithoutEncryption, 10),
    });

    const group = await createGroupUseCase.execute({
      founder_id: user.id,
      name: 'Grupo de teste',
      password: '123456',
    });

    await deleteGroupUseCase.execute({
      group_id: group.id,
      user_id: user.id,
    });

    expect(groupRepositoryInMemory.groups).toEqual([]);
  });
});
