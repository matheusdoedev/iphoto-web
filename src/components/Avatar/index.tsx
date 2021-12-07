import Image from 'next/image';

import { AnchorLink } from '~/components';

import styles from './styles.module.scss';

interface IAvatarProps {
  userName: string;
  userAvatar: string;
}

function Avatar({ userName, userAvatar }: IAvatarProps): JSX.Element {
  return (
    <AnchorLink className={styles.Avatar}>
      {userName}
      <Image
        src={userAvatar}
        alt={userName}
        width={43}
        height={43}
        layout="fixed"
      />
    </AnchorLink>
  );
}

export default Avatar;
