export type KavaEvent = {
  index: number,
  type: string,
  getEventModel: (...args: any) => any
};
