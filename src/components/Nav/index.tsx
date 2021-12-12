import { memo, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FiMenu } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { AnchorLink, Avatar, Dropdown } from '~/components';
import { useAuth } from '~/contexts/AuthenticationContext';

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
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback((): void => {
    logout();
    router.push('/signin');
    toast.success('User unlogged.');
  }, [logout, router]);

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
            <Dropdown
              toggleContent={
                <FiMenu size={36} width={64} height={36} color="#0E2222" />
              }
              options={[{ label: 'Exit', onClick: handleLogout }]}
            />
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
    [handleLogout, internalPage, userAvatarData],
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
