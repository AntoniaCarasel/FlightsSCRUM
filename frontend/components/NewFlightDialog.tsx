import React from 'react'
import { Dialog, Pane, toaster } from 'evergreen-ui'

type NewFlightDialogProps = {
    isActive?: boolean
    onClose?: (isConfirmed: boolean) => Promise<void>
}

const NewFlightDialog: React.FC<NewFlightDialogProps> = ({ isActive, onClose }) => {
    const [isShown, setIsShown] = React.useState(isActive)

    React.useEffect(() => {
        setIsShown(!!isActive)
    }, [isActive])

    const onCloseComplete = async () => {
        if (typeof onClose === 'function') {
            await onClose(false)
            return
        }
    }

    const onConfirm = async () => {
        if (typeof onClose === 'function') {
            await onClose(true)
            return
        }
    }

    return (
        <Pane>
            <Dialog
                isShown={isShown}
                onCloseComplete={onCloseComplete}
                onConfirm={onConfirm}
                confirmLabel="Mai departe"
                cancelLabel="Anulare"
                title="Confirmi adăugarea unui nou zbor?"
            >
                {null}
            </Dialog>
        </Pane>
    )
}

export default NewFlightDialog