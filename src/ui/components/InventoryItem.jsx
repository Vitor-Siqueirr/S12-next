import { format } from "date-fns";
import { capitalize } from "lodash";
import { computeInventoryItemWear } from "../../domain/computeInventoryItemWear";
import { displayableFragility } from "../services/displayableFragility";
import { displayableWear } from "../services/displayableWear";
import cx from "./InventoryItem.module.scss";

export const InventoryItem = ({ item }) => {
  const wear = computeInventoryItemWear(item);

  return (
    <li
      className={cx.container}
      style={{
        backgroundColor: displayableWear(wear).color,
        boxShadow: `0px 0px 8px 2px ${displayableWear(wear).color}`,
      }}
      data-testid="inventory-list">
      <dl>
        <h3 className={cx.title} data-testid="item-title">
          {capitalize(item.type)} | {item.brand} {item.model}
        </h3>

        <div className={cx.field}>
          <dt className={cx.fieldTitle}>Sector</dt>

          <dd className={cx.fieldData} data-testid="item-sector">
            {item.sector}
          </dd>
        </div>

        <div className={cx.field}>
          <dt className={cx.fieldTitle}>Fragility</dt>

          <dd className={cx.fieldData} data-testid="item-fragility">
            {displayableFragility(item.fragility)}
          </dd>
        </div>

        <div className={cx.field}>
          <dt className={cx.fieldTitle}>Last Maintenance</dt>

          <dd className={cx.fieldData} data-testid="item-last-maintenance">
            {format(item.lastMaintenance, "dd/MM/yyyy")}
          </dd>
        </div>

        <div className={cx.field}>
          <dt className={cx.fieldTitle}>Wear</dt>

          <dd className={cx.fieldData} data-testid="item-wearE">
            {displayableWear(wear).text}
          </dd>
        </div>
      </dl>
    </li>
  );
};
