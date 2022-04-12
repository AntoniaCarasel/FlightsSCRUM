import React from 'react'
import { Dialog, Pane } from 'evergreen-ui'

type OfferDialogProps = {
    isActive?: boolean
    onClose?: Function
}

const OfferDialog: React.FC<OfferDialogProps> = ({ isActive, onClose }) => {
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
                title="Ești aproape de revendicarea ofertei, mai ai doar un pas!"
                hasFooter={false}
                width={420}
            >
                Pentru a alege oferta selectată, conectează-te sau creează-ți un cont chiar acum.
            </Dialog>
        </Pane>
    )
}

export default OfferDialog