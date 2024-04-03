import { wait } from "../../../utils/wait";
import inventory from "./inventory.json";

export const getInventory = async () => {
  await wait(1000);

  return inventory;
};
