import { useRouter } from 'next/router';

import { FiArrowLeft } from 'react-icons/fi';

import styles from './styles.module.scss';

function GoBackButton(): JSX.Element {
  const router = useRouter();

  const handleGoBack = (): void => {
    router.back();
  };

  return (
    <button
      type="button"
      onClick={handleGoBack}
      className={styles.GoBackButton}
    >
      <FiArrowLeft size={24} color="#0e2222" />
      Back
    </button>
  );
}

export default GoBackButton;
