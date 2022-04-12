import React from 'react'
import { Button, Dialog, Pane, TextInputField } from 'evergreen-ui'

import useAuth from '../hooks/useAuth'
import styles from '../styles/modules/Login.module.css'

type RegisterDialogProps = {
    isActive?: boolean
    onClose?: Function
}

const RegisterDialog: React.FC<RegisterDialogProps> = ({ isActive, onClose }) => {
    const { signUp } = useAuth()
    const [isShown, setIsShown] = React.useState(isActive)
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [mail, setMail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [rPassword, setRPassword] = React.useState('')

    React.useEffect(() => {
        setIsShown(!!isActive)
    }, [isActive])

    const onCloseComplete = () => {
        if (typeof onClose === 'function') {
            onClose()
            return
        }
    }

    const handleRegister = async () => {
        const email = mail;

        console.log({ firstName, lastName, email, phone })

        await signUp({ firstName, lastName, email, phone })

        setIsShown(false)
        setFirstName('')
        setLastName('')
        setMail('')
        setPhone('')
        setPassword('')
        setRPassword('')
    }

    return (
        <Pane>
            <Dialog
                isShown={isShown}
                onCloseComplete={onCloseComplete}
                title="Completați cu datele dvs. pentru a vă înregistra!"
                hasFooter={false}
                shouldCloseOnOverlayClick={false}
                width={430}
            >
                <div className={styles.fullName}>
                    <TextInputField
                        value={firstName}
                        onChange={(e: any) => setFirstName(e.target.value)}
                        label="Prenume"
                        inputHeight={38}
                        placeholder="Ion"
                        required
                    />
                    <TextInputField
                        value={lastName}
                        onChange={(e: any) => setLastName(e.target.value)}
                        label="Nume"
                        inputHeight={38}
                        placeholder="Popescu"
                        required
                    />
                </div>
                <TextInputField
                    value={phone}
                    onChange={(e: any) => setPhone(e.target.value)}
                    label="Telefon"
                    type="tel"
                    inputHeight={38}
                    placeholder="+40 --- --- ---"
                    required
                />
                <TextInputField
                    value={mail}
                    onChange={(e: any) => setMail(e.target.value)}
                    label="Email"
                    inputHeight={38}
                    placeholder="ion.popescu@example.com"
                    required
                />
                <TextInputField
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    type="password"
                    label="Parola"
                    inputHeight={38}
                    required
                />
                <TextInputField
                    value={rPassword}
                    onChange={(e: any) => setRPassword(e.target.value)}
                    type="password"
                    label="Repetare parolă"
                    inputHeight={38}
                    required
                />
                <div className={styles.submit}>
                    <Button size="large" appearance="primary" onClick={handleRegister}>
                        Creează cont!
                    </Button>
                </div>
            </Dialog>
        </Pane>
    )
}

export default RegisterDialog
