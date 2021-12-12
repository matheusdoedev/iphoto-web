import { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  containerStyle?: string;
}

function Input({
  name,
  label,
  className,
  containerStyle,
  ...props
}: IInputProps): JSX.Element {
  return (
    <div className={`${styles.InputBlock} ${containerStyle}`}>
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
        </label>
      )}
      <input
        type="text"
        className={`form-control ${styles.InputField} ${className}`}
        id={name}
        name={name}
        aria-label={label}
        {...props}
      />
    </div>
  );
}

Input.defaultProps = {
  label: '',
  containerStyle: undefined,
};

export default Input;
