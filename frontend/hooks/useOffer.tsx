import React from 'react'

import { OfferType } from '../interfaces'

type OfferContextProps = {
    setOffer: (offer: OfferType) => void
    offer?: OfferType
}

const OfferContext = React.createContext<OfferContextProps>({
    setOffer: (_) => {},
    offer: undefined
})

const OfferProvider: React.FC = ({ children }) => {
    const [offer, setOffer] = React.useState<OfferType>()

    const context = React.useMemo(
        () => ({
            setOffer,
            offer
        }),
        [offer]
    )

    return <OfferContext.Provider value={context}>{children}</OfferContext.Provider>
}

const useOffer = () => React.useContext(OfferContext)

export default useOffer
export { OfferProvider }
