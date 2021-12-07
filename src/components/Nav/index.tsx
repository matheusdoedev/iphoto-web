import { memo, useMemo } from 'react';
import Link from 'next/link';

import { FiMenu } from 'react-icons/fi';

import { AnchorLink, Avatar } from '~/components';

import styles from './styles.module.scss';

interface IUserAvatarData {
  name: string;
  avatar: string;
}
interface INavProps {
  internalPage?: boolean;
  userAvatarData: IUserAvatarData;
}

function Nav({ internalPage, userAvatarData }: INavProps): JSX.Element {
  const NavContentMemo = useMemo(
    () =>
      internalPage ? (
        <>
          <li className="Navbar__menu__item">
            <Link href="/#howitworks" passHref>
              <Avatar
                userName={userAvatarData.name}
                userAvatar={userAvatarData.avatar}
              />
            </Link>
          </li>
          <li className="Navbar__menu__item">
            <Link href="/#howitworks" passHref>
              <AnchorLink className={styles.NavbarMenuLink}>
                <FiMenu size={36} width={64} height={36} color="#0E2222" />
              </AnchorLink>
            </Link>
          </li>
        </>
      ) : (
        <li className="Navbar__menu__item">
          <Link href="/#howitworks" passHref>
            <AnchorLink className={styles.NavbarMenuLink}>
              How it works
            </AnchorLink>
          </Link>
        </li>
      ),
    [internalPage, userAvatarData],
  );

  return (
    <nav className="Navbar">
      <ul className={styles.NavbarMenu}>{NavContentMemo}</ul>
    </nav>
  );
}

Nav.defaultProps = {
  internalPage: false,
};

export default memo(Nav);
