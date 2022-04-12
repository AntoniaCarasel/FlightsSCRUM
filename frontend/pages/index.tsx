import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Button, toaster } from 'evergreen-ui'
import { BiSearchAlt as SearchIcon } from 'react-icons/bi'

import { AirportType, RouteType } from '../interfaces'
import { HeroDateSelector, HeroAirportSelector } from '../components'
import useFlight from '../hooks/useFlight'
import styles from '../styles/modules/Home.module.css'
import { getRoutes } from '../db'

type HomePageProps = {
    page: string
    routes: RouteType[]
}

const HomePage: NextPage<HomePageProps> = ({ routes }) => {
    const router = useRouter()
    const { flight, resetFlight } = useFlight()
    const [isArrivalInvalid, setIsArrivalInvalid] = React.useState(false)
    const [isDepartureInvalid, setIsDepartureInvalid] = React.useState(false)
    const [isDateInvalid, setIsDateInvalid] = React.useState(false)

    const [airportsDeparture, setAirportsDeparture] = React.useState<AirportType[]>([])
    const [airportsArrival, setAirportsArrival] = React.useState<AirportType[]>([])

    React.useEffect(() => {
        resetFlight()

        const airportsDepartureSet = new Set<number>()
        const airportsArrivalSet = new Set<number>()

        const d: AirportType[] = []
        const a: AirportType[] = []

        for (let route of routes) {
            if (!airportsDepartureSet.has(route.departingAirport.id)) {
                d.push(route.departingAirport)
                airportsDepartureSet.add(route.departingAirport.id)
            }
            if (!airportsArrivalSet.has(route.arrivingAirport.id)) {
                a.push(route.arrivingAirport)
                airportsArrivalSet.add(route.arrivingAirport.id)
            }
        }

        setAirportsDeparture(d)
        setAirportsArrival(a)
    }, [])

    React.useEffect(() => {
        const acceptedRoutes = routes.filter(route => route.departingAirport.code === flight.departure?.code)
        const airportsArrivalSet = new Set<AirportType>()
        for (let route of acceptedRoutes) {
            airportsArrivalSet.add(route.arrivingAirport)
        }
        setAirportsArrival(Array.from(airportsArrivalSet))
    }, [flight.departure])

    // const airports: AirportType[] = [
    //     {
    //         location: 'București',
    //         country: 'România',
    //         code: 'OTP'
    //     },
    //     {
    //         location: 'Iași',
    //         country: 'România',
    //         code: 'IAS'
    //     }
    // ]

    const handleSearchClick = async () => {
        let isValid = true

        if (!flight.departure) {
            setIsDepartureInvalid(true)
            isValid = false
        } else {
            setIsDepartureInvalid(false)
        }

        // if (!flight.arrival) {
        //     setIsArrivalInvalid(true)
        //     isValid = false
        // } else {
        //     setIsArrivalInvalid(false)
        // }

        if (!flight.date) {
            setIsDateInvalid(true)
            isValid = false
        } else {
            setIsDateInvalid(false)
        }

        if (!isValid) {
            toaster.danger('Completează datele pentru zborul dorit!', {
                description: 'Vrem să știm de unde plecați și la ce dată veți pleca'
            })
            return
        }

        await router.push('/cauta')
    }

    return (
        <>
            <section className="container">
                <div className={styles.flightsHero}>
                    <div className={`flights-container ${styles.flightsContainer}`}>
                        <HeroAirportSelector
                            type="departure"
                            title="Plecare"
                            airports={airportsDeparture}
                            isInvalid={isDepartureInvalid}
                        />
                        <HeroAirportSelector
                            type="arrival"
                            title="Destinație"
                            airports={airportsArrival}
                            isInvalid={isArrivalInvalid}
                        />
                        <HeroDateSelector title="Data" isInvalid={isDateInvalid} />
                        <div>
                            <Button onClick={handleSearchClick} iconBefore={SearchIcon} appearance="primary">
                                Caută
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.aircraftHero}>
                <div />
            </section>
        </>
    )
}

const getStaticProps = async () => {
    const routes: RouteType[] = await getRoutes()

    return {
        props: {
            page: 'home',
            routes
        }
    }
}

export default HomePage

export { getStaticProps }
