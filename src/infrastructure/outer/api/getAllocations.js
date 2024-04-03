import { wait } from "../../../utils/wait";
import allocations from "./allocations.json";

export const getAllocations = async () => {
  await wait(1000);

  return allocations;
};
