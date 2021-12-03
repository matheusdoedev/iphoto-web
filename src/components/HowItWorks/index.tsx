import { useRef, useMemo } from 'react';
import Image from 'next/image';

import styles from './styles.module.scss';

interface IHowItWorksItem {
  title: string;
  text: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
}

function HowItWorks(): JSX.Element {
  const howItWorksItems = useRef<IHowItWorksItem[]>([
    {
      title: 'Upload your photos',
      text: 'Save your photos that is stuck in your smartphone in a secure place.',
      icon: '/assets/icons/camera.svg',
      iconWidth: 112,
      iconHeight: 92,
    },
    {
      title: 'Create albuns',
      text: 'Organize your saved phots into albums.',
      icon: '/assets/icons/book.svg',
      iconWidth: 78,
      iconHeight: 96,
    },
    {
      title: 'Manage your albums',
      text: 'Add or remove photos from your albums.',
      icon: '/assets/icons/book-open.svg',
      iconWidth: 96,
      iconHeight: 86,
    },
  ]);

  const HowItWorksMemo = useMemo(
    () =>
      howItWorksItems.current.map((item) => (
        <article key={item.title} className={styles.HowItWorksItem}>
          <Image
            src={item.icon}
            alt={item.title}
            width={item.iconWidth}
            height={item.iconHeight}
          />
          <h3 className={styles.HowItWorksItemTitle}>{item.title}</h3>
          <p className={styles.HowItWorksItemText}>{item.text}</p>
        </article>
      )),
    [],
  );

  return (
    <section id="howitworks" title="How It Works" className={styles.HowItWorks}>
      <div className={styles.HowItWorksContainer}>
        <h2 className={styles.HowItWorksTitle}>How It Works</h2>
        <section className={styles.HowItWorksContent}>{HowItWorksMemo}</section>
      </div>
    </section>
  );
}

export default HowItWorks;
