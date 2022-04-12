import React from 'react'
import Head from 'next/head'

import Logo from './Logo'
import Header from './Header'

type LayoutProps = {
    page?: string
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ page, children }) => {
    return (
        <>
            <Head>
                <title>Flights – TopSpBDTehSoft</title>
                <link rel="icon" href="/assets/favicon.ico" />
            </Head>

            <div className={`page${page ? ` page--${page}` : ''}`}>
                <Header />
                <main>{children}</main>
                <footer>
                    <div className="container">
                        <Logo />
                        <span>Proiect TopSpBDTehSoft © 2022</span>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Layout
