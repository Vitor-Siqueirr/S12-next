import cx from "./Header.module.scss";
import Link from "next/link";

export const Header = () => {
  return (
    <header className={cx.header}>
      <Link href={"/rooms"}>
        <h1 className={cx.title}>Sistema Interno</h1>
      </Link>

      <nav className={cx.navbar}>
        <ul className={cx.navbarList}>
          <li className={cx.navbarListItem} data-testid="rooms">
            <Link href={"/rooms"}>Salas</Link>
          </li>
          <li className={cx.navbarListItem} data-testid="students">
            <Link href={"/students"}>Alunos</Link>
          </li>
          <li className={cx.navbarListItem} data-testid="inventory">
            <Link href="/inventory">Inventario</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
