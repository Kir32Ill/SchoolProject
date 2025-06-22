import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import styles from './Header.module.css'
interface NavItemProps {
    to: string
    activeIcon: string
    inactiveIcon: string
    className?: string
}

const NavItem: React.FC<NavItemProps> = ({to, activeIcon, inactiveIcon, className}) => {
    const isActive = useMatch(to)
    const iconPath = isActive ? `/${activeIcon}` : `/${inactiveIcon}`
    return (
        <Link to={to} className={className}>
            <img src={iconPath} className={styles['nav-icon']}/>
        </Link>
    )
}

export default NavItem