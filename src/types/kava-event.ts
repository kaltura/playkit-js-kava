// import { KavaModel } from "../kava-model";

export type KavaEvent = {
  index: number,
  type: string,
  getEventModel: (...args: any) => any
};
