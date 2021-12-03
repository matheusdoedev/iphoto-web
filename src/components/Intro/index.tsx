import { useRouter } from 'next/router';

import { Button, Header } from '~/components';

import styles from './styles.module.scss';

function Intro(): JSX.Element {
  const router = useRouter();

  const handleNavigateToSignIn = (): void => {
    router.push('/signin');
  };

  return (
    <section className={styles.Intro}>
      <div className={styles.IntroContainer}>
        <Header />
        <section className={styles.IntroContent}>
          <h1 className={styles.IntroTitle}>
            A place to save te key momments of your life
          </h1>
          <p className={styles.IntroText}>
            Iphoto have the porpose to be a place where you can save your photos
            and create albuns with them
          </p>
          <Button onClick={handleNavigateToSignIn}>Get Started</Button>
        </section>
      </div>
    </section>
  );
}

export default Intro;
