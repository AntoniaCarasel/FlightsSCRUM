import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Button } from 'evergreen-ui'

import { ServiceType } from '../interfaces'
import { SelectedOffer, ServiceItem, ReserveDialog } from '../components'
import useOffer from '../hooks/useOffer'
import { addReservation, getCompanyServices } from '../db'

const OfferPage: NextPage = () => {
    const router = useRouter()
    const { offer } = useOffer()
    const [servicesPrice, setServicesPrice] = React.useState<number>(0)
    const [services, setServices] = React.useState<ServiceType[]>([])
    const [isReserveDialogActive, setIsReserveDialogActive] = React.useState(false)
    const [isReserveButtonActive, setIsReserveButtonActive] = React.useState(true)

    // const services: ServiceType[] = [
    //     {
    //         name: 'Serviciu 1',
    //         // description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, molestiae?',
    //         price: 10
    //     },
    //     {
    //         name: 'Serviciu 2',
    //         // description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores dignissimos doloremque ducimus eveniet exercitationem neque nesciunt numquam quod ullam?',
    //         price: 15
    //     },
    //     {
    //         name: 'Serviciu 3',
    //         // description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex excepturi iste tempore temporibus voluptates.',
    //         price: 6
    //     }
    // ]

    React.useEffect(() => {
        const getServices = async () => {
            if (!offer) {
                return
            }

            const services = await getCompanyServices(offer.company.id)
            if (!services) {
                return
            }

            setServices(services)
        }

        getServices()
    }, [])

    React.useEffect(() => {
        if (!offer) {
            router.push('/')
            return
        }
    }, [router, offer])

    if (!offer) {
        return <></>
    }

    const handleServiceClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!e.currentTarget) {
            return
        }

        const factor = e.currentTarget.classList.contains('active') ? 1 : -1
        const servicePrice = factor * Number.parseInt(e.currentTarget.dataset.price as string)
        setServicesPrice((totalPrice) => totalPrice + servicePrice)
    }

    const handleReserveClick = async (e: React.MouseEvent<HTMLElement>) => {
        const date = new Date().toISOString().split('T')[0]

        console.log('Flight reserved', offer.id)

        const ok = await addReservation(date, `${offer.price} + ${servicesPrice}`, offer.id, 1)

        if (ok) {
            setIsReserveDialogActive(true)
        }
    }

    const handleReserveClose = () => {
        setIsReserveButtonActive(false)
    }

    return (
        <div className="container grid">
            <main>
                <SelectedOffer offer={offer} />
                <div className="services">
                    <h2>Servicii</h2>
                    {services.map((service, key) => (
                        <ServiceItem onClick={handleServiceClick} service={service} key={key} />
                    ))}
                </div>
            </main>
            <aside>
                <h2 className="partial-header">Preț bilet</h2>
                <h3 className="partial-price">{offer.price} €</h3>
                <br />
                <h2>Preț total</h2>
                <h3>{Number(offer.price + servicesPrice).toFixed(2)} €</h3>

                <Button
                    disabled={!isReserveButtonActive}
                    appearance="primary"
                    size="large"
                    onClick={handleReserveClick}
                >
                    Rezervă
                </Button>
            </aside>
            <ReserveDialog isActive={isReserveDialogActive} onClose={handleReserveClose} />
        </div>
    )
}

const getStaticProps = async () => {
    return {
        props: { page: 'offer' }
    }
}

export default OfferPage

export { getStaticProps }
