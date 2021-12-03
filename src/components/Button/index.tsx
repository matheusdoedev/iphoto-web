import { ButtonHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ children, ...props }: IButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={`btn btn-primary ${styles.Button}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
