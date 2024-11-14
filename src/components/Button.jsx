import styles from "./Button.module.css";

const Button = ({ children, type, onClick }) => { // corrected onClick
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;