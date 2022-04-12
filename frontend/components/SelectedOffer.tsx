import React from 'react'
import { GiAirplaneArrival as AirplaneArrivalIcon, GiAirplaneDeparture as AirplaneDepartureIcon } from 'react-icons/gi'

import { OfferType } from '../interfaces'
import styles from '../styles/modules/Offer.module.css'

type SelectedOfferProps = {
    offer: OfferType,
}

const SelectedOffer: React.FC<SelectedOfferProps> = ({ offer }) => {
    const trimTime = (time: string) => {
        return time.length > 5 ? time.slice(0, -3): time
    }

    return (
        <div className="special-offer">
            <h2>Călătorie</h2>
            <article className={styles.specialOffer}>
                <section className={styles.departure}>
                    <div className={styles.aircraft}>
                        <AirplaneDepartureIcon />
                        Plecare
                    </div>
                    <div className={styles.time}>{trimTime(offer.departure.time)}</div>
                    <div className={styles.location}>{offer.departure.location}</div>
                </section>

                <section className={styles.arrow}>
                    <div className={styles.company}>{offer.company.name}</div>
                    <div className="offer-arrow" />
                </section>

                <section className={styles.arrival}>
                    <div className={styles.aircraft}>
                        <AirplaneArrivalIcon />
                        Sosire
                    </div>
                    <div className={styles.time}>{trimTime(offer.arrival.time)}</div>
                    <div className={styles.location}>{offer.arrival.location}</div>
                </section>
            </article>
        </div>

    )
}

export default SelectedOffer
