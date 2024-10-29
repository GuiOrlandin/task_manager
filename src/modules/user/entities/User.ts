import { randomUUID } from "crypto";


export interface UserSchema {
  email: string;
  password_hash: string;
  name: string;
  id?: string;
  created_at?: Date;
  avatar?: string | null;
}

export class User {
  private props: UserSchema;

  constructor(props: UserSchema) {
    this.props = {
      ...props,
      created_at: props.created_at || new Date(),
      id: props.id || randomUUID(),
      avatar: props.avatar || null,
    };
  }

  get id(): string {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password_hash(): string {
    return this.props.password_hash;
  }

  set password_hash(password: string) {
    this.props.password_hash = password;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }
  get avatar(): string {
    return this.props.avatar;
  }

  set avatar(avatar: string) {
    this.props.avatar = avatar;
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
