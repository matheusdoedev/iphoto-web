import { memo } from 'react';
import Image from 'next/image';

import { Nav } from '~/components';

import styles from './styles.module.scss';

interface IHeaderProps {
  internalPage?: boolean;
}

function Header({ internalPage }: IHeaderProps): JSX.Element {
  return (
    <header
      className={`${styles.Header} ${internalPage && styles.HeaderIntern}`}
    >
      <Image
        src={`/assets/icons/iphoto-logo-${
          internalPage ? 'black' : 'white'
        }.svg`}
        alt="Iphoto"
        width={118}
        height={32}
        layout="fixed"
      />
      <Nav
        internalPage={internalPage}
        userAvatarData={{
          name: 'Mariah',
          avatar: '/assets/images/avatar-mock.jpg',
        }}
      />
    </header>
  );
}

Header.defaultProps = {
  internalPage: false,
};

export default memo(Header);
