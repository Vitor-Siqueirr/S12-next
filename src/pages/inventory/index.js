import { InventoryItem } from "@/ui/components/InventoryItem";
import cx from "./Inventory.module.scss";
import { fetchInventory } from "@/infrastructure/inner/fetchInventory";

export default function Inventory({ inventory }) {
  return (
    <>
      <main>
        <ul className={cx.list}>
          {inventory.map((item) => (
            <InventoryItem key={item.id} item={item} />
          ))}

          <div className={cx.spacing} />
        </ul>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  let inventory;

  await fetchInventory().then(async (data) => {
    inventory = await data;
  });

  return {
    props: {
      inventory: inventory,
    },
  };
};
