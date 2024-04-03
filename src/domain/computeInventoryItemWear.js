import { differenceInDays } from "date-fns";

export const computeInventoryItemWear = (item) => {
  const { fragility, lastMaintenance } = item;

  const fragilityMultiplierMatrix = {
    1: 0.5,
    2: 3,
    3: 6,
    4: 11,
    5: 27,
  };

  const fragilityMultiplier = fragilityMultiplierMatrix[fragility];
  const daysSinceLastMaintenance = differenceInDays(
    new Date(),
    lastMaintenance
  );
  const maxWear = 1000;

  return Math.min(fragilityMultiplier * daysSinceLastMaintenance, maxWear);
};
