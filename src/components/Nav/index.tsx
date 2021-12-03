import Link from 'next/link';

import { AnchorLink } from '~/components';

import styles from './styles.module.scss';

function Nav(): JSX.Element {
  return (
    <nav className="Navbar">
      <ul className="Navbar__menu">
        <li className="Navbar__menu__item">
          <Link href="/#howitworks" passHref>
            <AnchorLink className={styles.NavbarMenuLink}>
              How it works
            </AnchorLink>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
