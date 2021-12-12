/* eslint-disable no-nested-ternary */
import { ButtonHTMLAttributes, CSSProperties } from 'react';

import styles from './styles.module.scss';

type ButtonSize = 'fullSize' | 'small' | 'standard';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  secondary?: boolean;
}

function Button({
  children,
  size,
  secondary,
  ...props
}: IButtonProps): JSX.Element {
  return (
    <button
      type="button"
      style={{
        maxWidth:
          size === 'fullSize' ? '100%' : size === 'small' ? 'auto' : '200px',
        width: size === 'small' ? 'auto' : '100%',
        background: secondary ? '#fff' : '',
        color: secondary ? '#025d8f' : '',
      }}
      className={`btn btn-primary ${styles.Button} ${size} `}
      {...props}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'standard',
  secondary: false,
};

export default Button;
