import React from 'react'
import { Button, Dialog, Pane, TextInputField, toaster } from 'evergreen-ui'
import { IoLogIn as LoginIcon } from 'react-icons/io5'

import useAuth from '../hooks/useAuth'
import styles from '../styles/modules/Login.module.css'

type LoginDialogProps = {
    isActive?: boolean
    onClose?: Function
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isActive, onClose }) => {
    const [isShown, setIsShown] = React.useState(isActive)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const { signInWithEmailAndPassword } = useAuth()

    React.useEffect(() => {
        setIsShown(!!isActive)
    }, [isActive])

    const onCloseComplete = () => {
        if (typeof onClose === 'function') {
            onClose()
            return
        }
    }

    const onSubmitComplete = async () => {
        try {
            await signInWithEmailAndPassword(email, password)
            setIsShown(false)
            setEmail('')
            setPassword('')
        } catch (error) {
            // @ts-ignore
            if (error.status === 403) {
                toaster.danger('Email sau parola invalida!', { hasCloseButton: false })
                return;
            }

            toaster.danger('A intervenit o eroare neașteptată!');
            console.error(error)
        }
    }

    return (
        <Pane>
            <Dialog
                isShown={isShown}
                onCloseComplete={onCloseComplete}
                title="Completați cu datele dvs. de conectare!"
                hasFooter={false}
                shouldCloseOnOverlayClick={false}
                width={430}
            >
                <TextInputField
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    label="Email"
                    inputHeight={38}
                    placeholder="ion.popescu@example.com"
                    required
                />
                <TextInputField
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    type="password"
                    label="Parola"
                    inputHeight={38}
                    required
                />
                <div className={styles.submit}>
                    <Button onClick={() => onSubmitComplete()} size="large" appearance="primary" iconAfter={LoginIcon}>
                        Conectați-vă!
                    </Button>
                </div>
            </Dialog>
        </Pane>
    )
}

export default LoginDialog
