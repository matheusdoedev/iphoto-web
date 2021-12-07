import { Header } from '~/components';

import styles from '~/styles/pages/user/index.module.scss';

function UserIndex(): JSX.Element {
  return (
    <section className={styles.UserIndex}>
      <div className={styles.UserIndexContainer}>
        <Header internalPage />
      </div>
    </section>
  );
}

export default UserIndex;
