import { getInventory } from "../outer/api/getInventory";

export const fetchInventory = async () => {
  const response = await getInventory();
  const sectors = response.data;

  return sectors.flatMap((sector) =>
    sector.items.map((item) => ({
      id: item.id,
      type: item.type,
      brand: item.brand,
      model: item.model,
      fragility: item.fragility,
      lastMaintenance: mapLastMaintenance(item.last_maintenance),
      sector: sector.sector,
    }))
  );
};

const mapLastMaintenance = (lastMaintenance) => {
  const { day, month, year } = lastMaintenance;

  return new Date(year, month, day).toISOString();
};
