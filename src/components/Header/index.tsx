import { memo } from 'react';
import Image from 'next/image';

import { Nav } from '~/components';
import { useAuth } from '~/contexts/AuthenticationContext';

import styles from './styles.module.scss';
import { ISignUpResponseUser } from '~/models/Authentication';

interface IHeaderProps {
  internalPage?: boolean;
}

function Header({ internalPage }: IHeaderProps): JSX.Element {
  const user = useAuth().user as ISignUpResponseUser;

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
          name: user?.name,
          avatar: '/assets/images/user-mock.png',
        }}
      />
    </header>
  );
}

Header.defaultProps = {
  internalPage: false,
};

export default memo(Header);
