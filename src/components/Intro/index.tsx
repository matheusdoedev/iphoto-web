import { Header } from '~/components';

import styles from './styles.module.scss';

function Intro(): JSX.Element {
  return (
    <section className={styles.Intro}>
      <div className={styles.IntroContainer}>
        <Header />
        <section className="Intro__content">
          <h1 className="Intro__title">
            A place to save te key momments of your life
          </h1>
          <p className="Intro__text">
            Iphoto have the porpose to be a place where you can save your photos
            and create albuns with them
          </p>
          <button type="button">Get Started</button>
        </section>
      </div>
    </section>
  );
}

export default Intro;
