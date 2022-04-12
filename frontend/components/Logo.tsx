import React from 'react'
import Link from 'next/link'
import { MdAirplaneTicket as LogoIcon } from 'react-icons/md'
import styles from '../styles/modules/Logo.module.css'

const Logo: React.FC = () => {
    return (
        <Link href="/">
            <a className={`${styles.logo} logo`}>
                <LogoIcon />
                <span>Flights</span>
                <code className={styles.logoByUNIBUC}>by UNIBUC</code>
            </a>
        </Link>
    )
}

export default Logo
