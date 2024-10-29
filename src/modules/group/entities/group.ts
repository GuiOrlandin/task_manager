import { randomUUID } from 'crypto';
import { User } from 'src/modules/user/entities/User';
import { SubGroup } from './subGroup';

interface GroupSchema {
  name: string;
  id?: string;
  founder_id: string;
  created_at?: Date;
  password?: string;
  members?: User[];
  subGroups?: SubGroup[];
}

export class Group {
  private props: GroupSchema;

  constructor(props: GroupSchema) {
    this.props = {
      ...props,
      created_at: props.created_at || new Date(),
      id: props.id || randomUUID(),
      members: props.members || [],
      subGroups: props.subGroups || [],
    };
  }

  get id(): string {
    return this.props.id;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get founder_id(): string {
    return this.props.founder_id;
  }

  set founder_id(founder_id: string) {
    this.props.founder_id = founder_id;
  }

  get members(): User[] {
    return this.props.members;
  }
  get subGroups(): SubGroup[] {
    return this.props.subGroups;
  }
  set subGroups(subGroup: SubGroup) {
    this.props.subGroups.push(subGroup);
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  removeUser(userId: string) {
    this.props.members = this.props.members.filter(
      (member) => member.id !== userId,
    );
  }

  deleteSubGroup(subGroupId: string) {
    this.props.subGroups = this.props.subGroups.filter(
      (subGroup) => subGroup.id !== subGroupId,
    );
  }

  addUser(user: User) {
    this.props.members.push(user);
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
