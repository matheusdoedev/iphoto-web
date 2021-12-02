import Image from 'next/image';

import { Nav } from '~/components';

import styles from './styles.module.scss';

function Header(): JSX.Element {
  return (
    <header className={styles.Header}>
      <Image
        src="/assets/icons/iphoto-logo-white.svg"
        alt="Iphoto"
        width={118}
        height={32}
        layout="fixed"
      />
      <Nav />
    </header>
  );
}

export default Header;
