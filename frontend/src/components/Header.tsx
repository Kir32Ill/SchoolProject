import styles from './Header.module.css'
import NavItem from './NavItem'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoWrapper}>
                <div className={styles.logo}>
                    <img src='/logo.png' className={styles.logoImage}/>
                </div>
                <div className={styles.title}>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</div>
            </div>
            <nav className={styles.nav}>
                <NavItem
                    to='/'
                    activeIcon='icons/csv-analyzer-active.png'
                    inactiveIcon='icons/csv-analyzer-inactive.png'
                    className={`${styles['nav-link']} `}
                />
                <NavItem
                    to='/generate'
                    activeIcon='icons/csv-generator-active.png'
                    inactiveIcon='icons/csv-generator-inactive.png'
                    className={`${styles['nav-link']} `}
                />  
                <NavItem
                    to='/history'
                    activeIcon='icons/history-active.png'
                    inactiveIcon='icons/history-inactive.png'
                    className={`${styles['nav-link']}`}
                />
            </nav>
        </header>
    )
}

export default Header