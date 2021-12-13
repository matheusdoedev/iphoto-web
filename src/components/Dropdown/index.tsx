import { MouseEventHandler, useMemo } from 'react';

import { Dropdown as DropdownMenu } from 'react-bootstrap';

import styles from './styles.module.scss';

interface IDropdownOption {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

interface IDropdownProps {
  options: IDropdownOption[];
  toggleContent: string | JSX.Element;
}

function Dropdown({ options, toggleContent }: IDropdownProps): JSX.Element {
  const DropdownOptionsMemo = useMemo(
    () =>
      options.map((option) => (
        <DropdownMenu.Item
          key={option.label}
          href={option.href ?? ''}
          onClick={option.onClick ?? undefined}
        >
          {option.label}
        </DropdownMenu.Item>
      )),
    [options],
  );

  return (
    <DropdownMenu drop="down">
      <DropdownMenu.Toggle
        style={{ background: 'none', border: 'none' }}
        id="dropdownMenu-basic"
      >
        {toggleContent}
      </DropdownMenu.Toggle>

      <DropdownMenu.Menu className={styles.DropdownMenu}>
        {DropdownOptionsMemo}
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
}

export default Dropdown;
