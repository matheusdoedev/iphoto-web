import { useRef, useMemo } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

interface IFooterNavItem {
  label: string;
  href: string;
}

function Footer(): JSX.Element {
  const navItems = useRef<IFooterNavItem[]>([
    { label: 'How it works', href: '/#howitworks' },
    { label: 'Sign in', href: '/signin' },
    { label: 'Create a account', href: '/signup' },
  ]);

  const NavItemsMemo = useMemo(
    () =>
      navItems.current.map((item) => (
        <li key={item.label}>
          <a href={item.href} className={styles.FooterNavMenuLink}>
            {item.label}
          </a>
        </li>
      )),
    [],
  );

  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterContainer}>
        <div className={styles.FooterContent}>
          <nav className={styles.FooterNav}>
            <ul className={styles.FooterNavMenu}>{NavItemsMemo}</ul>
          </nav>
          <Image
            src="/assets/icons/iphoto-logo-white.svg"
            alt="Iphoto"
            width={112}
            height={30}
            layout="fixed"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
