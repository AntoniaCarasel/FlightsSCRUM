import React from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { OfferType, RouteType } from '../interfaces'
import { BestOffer, Offer, OfferDialog } from '../components'
import useFlight from '../hooks/useFlight'
import useAuth from '../hooks/useAuth'
import useOffer from '../hooks/useOffer'
import { getRoutes, getFlights } from '../db'

type SearchPageProps = {
    page: string
    routes: RouteType[]
}

const SearchPage: NextPage<SearchPageProps> = ({ routes }) => {
    const router = useRouter()
    const { user } = useAuth()
    const { flight } = useFlight()
    const { setOffer } = useOffer()
    const [minPrice, setMinPrice] = React.useState(NaN)
    const [maxPrice, setMaxPrice] = React.useState(NaN)
    const [isOfferDialogActive, setIsOfferDialogActive] = React.useState(false)
    const [offers, setOffers] = React.useState<OfferType[]>([])

    let activeRoutes = routes.filter((route) => route.departingAirport.code === flight.departure?.code)
    if (flight.arrival && flight.arrival.code) {
        activeRoutes = activeRoutes.filter((route) => route.arrivingAirport.code === flight.arrival?.code)
    }

    React.useEffect(() => {
        const getOffers = async () => {
            const o: OfferType[] = []

            // @ts-ignore
            const date = flight.date.toISOString().split('T')[0];

            for (let route of activeRoutes) {
                const flights = await getFlights(route.id, date)
                for (let flight of flights) {
                    if (!flight) {
                        continue
                    }

                    const offer: OfferType = {
                        id: (flight as any).id,
                        departure: {
                            location: `(${route.departingAirport.code}) ${route.departingAirport.location}`,
                            time: flight.etd
                        },
                        arrival: {
                            location: `(${route.arrivingAirport.code}) ${route.arrivingAirport.location}`,
                            time: flight.eta
                        },
                        price: flight.price,
                        company: {
                            name: flight.company.name,
                            id: flight.company.id
                        }
                    }
                    o.push(offer)
                }
            }

            setOffers(o)
        }

        getOffers()
    }, [])

    React.useEffect(() => {
        const getHeroPrices = async () => {
            if (offers.length === 0) {
                return
            }

            let max = offers[0].price
            let min = offers[0].price
            for (let offer of offers) {
                if (max < offer.price) {
                    max = offer.price
                }
                if (min > offer.price) {
                    min = offer.price
                }
            }
            setMinPrice(min)
            setMaxPrice(max)
        }

        getHeroPrices()
    }, [offers])

    // const offers: OfferType[] = [
    //     {
    //         departure: {
    //             location: '(OTP) București',
    //             time: '13:00'
    //         },
    //         arrival: {
    //             location: '(IAS) Iași',
    //             time: '14:50'
    //         },
    //         price: 30,
    //         details: 'Blue Air'
    //     },
    //     {
    //         departure: {
    //             location: '(OTP) București',
    //             time: '15:00'
    //         },
    //         arrival: {
    //             location: '(IAS) Iași',
    //             time: '17:50'
    //         },
    //         price: 25,
    //         details: 'Tarom'
    //     }
    // ]
    //
    // for (let i = 0; i < 3; i++) {
    //     offers.push({
    //         departure: {
    //             location: '(OTP) București',
    //             time: '15:00'
    //         },
    //         arrival: {
    //             location: '(IAS) Iași',
    //             time: '17:50'
    //         },
    //         price: 25,
    //         details: 'Wizz Air'
    //     })
    // }

    const handleChooseOffer = async (offer: OfferType) => {
        if (!user) {
            setIsOfferDialogActive(true)
            return
        }

        setOffer(offer)
        await router.push('/oferta')
    }

    return (
        <>
            { isNaN(minPrice) || isNaN(maxPrice) ? null : (
                <div className="container">
                    <div className="best-offers">
                        <BestOffer label="Cel mai ieftin" price={minPrice} />
                        <BestOffer label="Cel mai scump" price={maxPrice} />
                    </div>
                </div>
            )}

            <section className="main">
                <div className="container">
                    <div className="offers">
                        {offers.map((offer, index) => (
                            <Offer key={index} offer={offer} onChooseOffer={handleChooseOffer} />
                        ))}
                    </div>
                </div>
            </section>

            <OfferDialog isActive={isOfferDialogActive} onClose={() => setIsOfferDialogActive(false)} />
        </>
    )
}

const getStaticProps = async () => {
    const routes: RouteType[] = await getRoutes()

    return {
        props: {
            page: 'search',
            routes
        }
    }
}

export default SearchPage

export { getStaticProps }
