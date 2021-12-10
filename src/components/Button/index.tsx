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
  const withStyles = (): CSSProperties => {
    if (size === 'small') {
      return { maxWidth: 'auto', width: 'auto' };
    }

    if (size === 'fullSize') {
      return { maxWidth: '100%', width: '100%' };
    }

    return { maxWidth: '200px', width: '100%' };
  };

  return (
    <button
      type="button"
      style={{
        ...withStyles(),
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
