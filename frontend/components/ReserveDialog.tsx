import React from 'react'
import { Dialog, Pane } from 'evergreen-ui'

type ReserveDialogProps = {
    isActive?: boolean
    onClose?: Function
}

const ReserveDialog: React.FC<ReserveDialogProps> = ({ isActive, onClose }) => {
    const [isShown, setIsShown] = React.useState(isActive)

    React.useEffect(() => {
        setIsShown(!!isActive)
    }, [isActive])

    const onCloseComplete = () => {
        if (typeof onClose === 'function') {
            onClose()
            return
        }
    }

    return (
        <Pane>
            <Dialog
                isShown={isShown}
                onCloseComplete={onCloseComplete}
                title="Îți mulțumim pentru rezervare!"
                hasFooter={false}
                width={420}
            >
                Informațiile despre rezervare dumneavoastră le veți primi în scurt timp pe mail.
            </Dialog>
        </Pane>
    )
}

export default ReserveDialog