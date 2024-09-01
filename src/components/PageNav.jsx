import { Link } from "react-router-dom";
import styles from "./PageNav.module.css"
import Logo from "./Logo";

const PageNav = () => {
    return(
        <nav className={styles.nav}>
           <Link to="/"> <Logo/></Link>
            <ul>
                <li>
                    <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                    <Link to="/product">Product</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default PageNav;