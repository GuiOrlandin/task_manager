import { User } from "../entities/User";

type Override = Partial<User>;

export function makeUser({ ...override }: Override) {
  return new User({
    email: "guiorlandin@gmail.com",
    name: "Guilherme",
    password_hash: "123456",
    ...override,
  });
}
