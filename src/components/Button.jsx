import styles from "./Button.module.css"

const Button = ({children ,type,onClik}) => {
  return ( <button className={`${styles.btn} ${styles[type]}`} onClick={onClik}>
        {children}
    </button>)
}

export default Button;