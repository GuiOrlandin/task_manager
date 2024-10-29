import { UserRepositoryInMemory } from "../repositories/userRepositoryInMemory";
import { CreateUserUseCase } from "./createUserUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("Should be able to create an user", async () => {
    const user = await createUserUseCase.execute({
      email: "guiorlandin@gmail.com",
      name: "Guilherme",
      password_hash: "123456",
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });
});
