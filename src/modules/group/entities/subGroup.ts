import { randomUUID } from 'crypto';

interface SubGroupSchema {
  name: string;
  id?: string;
  created_at?: Date;
  group_id: string;
  //   tasks?: Task[];
}

export class SubGroup {
  private props: SubGroupSchema;

  constructor(props: SubGroupSchema) {
    this.props = {
      ...props,
      created_at: props.created_at || new Date(),
      id: props.id || randomUUID(),
    };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }
  get group_id(): string {
    return this.props.group_id;
  }

  set group_id(group_id: string) {
    this.props.group_id = group_id;
  }

  //   get tasks(): Task[] {
  //     return this.props.tasks;
  //   }

  //   set task(task: string) {
  //     this.props.task = task;
  //   }

  get member(): string {
    return this.props.name;
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
