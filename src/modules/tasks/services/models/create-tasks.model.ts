export enum TypeTasks {
  FOOD = 'FOOD',
  LIFESTYLE = 'LIFESTYLE',
  WORKOUTS = 'WORKOUTS',
}

export enum InputType {
  CHECK = 'CHECK',
  COUNT = 'COUNT',
}

export class CreateTasksModel {
  constructor(
    public type: TypeTasks,
    public name: string,
    public description: string,
    public input: {
      type: InputType;
      label: string;
      check: {
        falseLabel: string;
        trueLabel: string;
      } | null;
      count: {
        min: number;
        max: number;
        default: number;
        multiplesLabel: string;
        uniqueLabel: string;
      } | null;
      gain: {
        label: string;
        value: number;
      } | null;
    },
  ) {}
}
