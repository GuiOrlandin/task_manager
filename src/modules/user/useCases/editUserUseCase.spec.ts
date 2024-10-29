import { UserRepositoryInMemory } from "../repositories/userRepositoryInMemory";
import { CreateUserUseCase } from "./createUserUseCase";
import { EditUserUseCase } from "./editUserUseCase";

let createUserUseCase: CreateUserUseCase;
let editUserUseCase: EditUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Edit User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    editUserUseCase = new EditUserUseCase(userRepositoryInMemory);
  });

  it("Should be able to edit an user", async () => {
    const user = await createUserUseCase.execute({
      email: "guiorlandin@gmail.com",
      name: "Guilherme",
      password_hash: "123456",
    });

    const userEdited = await editUserUseCase.execute({
      user_id: user.id,
      name: "Antonio",
    });

    expect(userRepositoryInMemory.users).toEqual([userEdited]);
  });
});
