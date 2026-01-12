import styles from './styles.module.css'

import type { CheckboxProps } from './types'

export const Checkbox = ({ id, name, value, onChange, label, className }: CheckboxProps) => {
  return (
    <div className={`${styles.checkbox__wrapper} ${className}`}>
      <label htmlFor={id} className={styles.checkbox__label}>
        <input
          id={id}
          name={name}
          className={styles.checkbox}
          type="checkbox"
          checked={value}
          onChange={onChange}
        />
        {label && <span className={styles.checkbox__label_text}>{label}</span>}
      </label>
    </div>
  )
}
