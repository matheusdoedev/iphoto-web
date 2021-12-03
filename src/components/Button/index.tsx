import { ButtonHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ children, ...props }: IButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center border border-transparent rounded-md ${styles.Button}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
