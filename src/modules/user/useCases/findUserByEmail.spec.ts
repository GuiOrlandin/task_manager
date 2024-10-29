import { UserRepositoryInMemory } from "../repositories/userRepositoryInMemory";
import { CreateUserUseCase } from "./createUserUseCase";
import { FindUserByEmailUseCase } from "./findUserByEmail";

let createUserUseCase: CreateUserUseCase;
let findUserByEmailUseCase: FindUserByEmailUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    findUserByEmailUseCase = new FindUserByEmailUseCase(userRepositoryInMemory);
  });

  it("Should be able to create an user", async () => {
    const user = await createUserUseCase.execute({
      email: "guiorlandin@gmail.com",
      name: "Guilherme",
      password_hash: "123456",
    });

    const FoundedUser = await findUserByEmailUseCase.execute({
      email: user.email,
    });

    expect(FoundedUser).toEqual(user);
  });
});
