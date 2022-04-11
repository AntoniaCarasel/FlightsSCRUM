import React from 'react'
import { useRouter } from 'next/router'
import { Avatar, Button } from 'evergreen-ui'
import { FaSignInAlt as RegisterIcon } from 'react-icons/fa'
import { IoMdExit as SingOutIcon } from 'react-icons/io'
import { MdOutlineAdminPanelSettings as DashboardIcon } from 'react-icons/md'

import Logo from './Logo'
import LoginDialog from './LoginDialog'
import RegisterDialog from './RegisterDialog'
import useAuth from '../hooks/useAuth'

const Header: React.FC = () => {
    const router = useRouter()
    const { user, signOut } = useAuth()
    const [isLoginDialogActive, setIsLoginDialogActive] = React.useState(false)
    const [isRegisterDialogActive, setIsRegisterDialogActive] = React.useState(false)

    const handleLoginClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setIsLoginDialogActive(true)
    }

    const handleRegisterClick = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        setIsRegisterDialogActive(true)
    }

    const handleLoginOnClose = () => {
        setIsLoginDialogActive(false)
    }

    const handleRegisterOnClose = () => {
        setIsRegisterDialogActive(false)
    }

    const handleSignOutClick = async () => {
        await signOut()
    }

    const handleDashboardClick = async () => {
        await router.push('/administrare')
    }

    return (
        <header>
            <div className="container">
                <span>
                    <Logo />
                </span>
                {user ? (
                    <div className="user">
                        <Avatar name={`${user.firstName} ${user.lastName}`} shape="square" size={38} />
                        {user.isAdmin ? (
                            <Button iconAfter={DashboardIcon} size="large" onClick={handleDashboardClick}>
                                Panou administrare
                            </Button>
                        ) : null}
                        <Button iconAfter={SingOutIcon} size="large" onClick={handleSignOutClick}>
                            Ieșire din cont
                        </Button>
                    </div>
                ) : (
                    <div className="anonymous">
                        <a onClick={handleLoginClick} href="">
                            Conectare
                        </a>
                        <Button
                            onClick={handleRegisterClick}
                            className="register"
                            iconBefore={RegisterIcon}
                            size="large"
                        >
                            Înregistrare
                        </Button>
                    </div>
                )}
            </div>

            <LoginDialog isActive={isLoginDialogActive} onClose={handleLoginOnClose} />
            <RegisterDialog isActive={isRegisterDialogActive} onClose={handleRegisterOnClose} />
        </header>
    )
}

export default Header
