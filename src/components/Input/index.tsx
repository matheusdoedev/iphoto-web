import { InputHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

function Input({ name, label, ...props }: IInputProps): JSX.Element {
  return (
    <div className={styles.InputBlock}>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="email"
        className={`form-control ${styles.InputField}`}
        id={name}
        name={name}
        aria-label={label}
        {...props}
      />
    </div>
  );
}

export default Input;
