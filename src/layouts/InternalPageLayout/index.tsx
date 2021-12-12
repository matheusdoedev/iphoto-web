import { ReactNode } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import { Footer, GoBackButton, Header } from '~/components';

import styles from './styles.module.scss';

interface IInternalPageLayoutProps {
  children: ReactNode;
  pageTitle: string;
  pageDescription?: string;
}

function InternalPageLayout({
  children,
  pageTitle,
  pageDescription,
}: IInternalPageLayoutProps): JSX.Element {
  return (
    <section className={styles.Wrapper}>
      <div className={styles.Container}>
        <Header internalPage />
        <GoBackButton />
        <section className={styles.Content}>
          <div className={styles.PageTitleBlock}>
            <h1 className={styles.Title}>{pageTitle}</h1>
            <p className={styles.Text}>{pageDescription}</p>
          </div>
          {children}
        </section>
      </div>
      <Footer />
    </section>
  );
}

InternalPageLayout.defaultProps = {
  pageDescription: undefined,
};

export default InternalPageLayout;
