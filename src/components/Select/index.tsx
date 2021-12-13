import { SelectHTMLAttributes, useMemo } from 'react';

import styles from './styles.module.scss';

interface ISelectOption {
  value: string;
  label: string;
}

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: ISelectOption[];
  defaultOption?: ISelectOption;
}

function Select({
  name,
  label,
  options,
  defaultOption,
  ...props
}: ISelectProps): JSX.Element {
  const SelectOptionsMemo = useMemo(
    () =>
      options.map((option) => (
        <option value={option.value}>{option.label}</option>
      )),
    [options],
  );

  const DefaultOptionMemo = useMemo(
    () =>
      defaultOption ? (
        <option selected value={defaultOption.value}>
          {defaultOption.label}
        </option>
      ) : (
        <option selected>Select a option</option>
      ),
    [defaultOption],
  );

  return (
    <label htmlFor={name} className={styles.SelectBlock}>
      {label}
      <select
        className={`form-select ${styles.SelectField}`}
        aria-label={label}
        {...props}
      >
        {DefaultOptionMemo}
        {SelectOptionsMemo}
      </select>
    </label>
  );
}

Select.defaultProps = {
  label: undefined,
  defaultOption: undefined,
};

export default Select;
