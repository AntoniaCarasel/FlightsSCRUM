import React from 'react'
import { GiAirplaneArrival as AirplaneArrivalIcon, GiAirplaneDeparture as AirplaneDepartureIcon } from 'react-icons/gi'
import { IoAirplane as ChoseIcon } from 'react-icons/io5'
import { Button } from 'evergreen-ui'

import { OfferType } from '../interfaces'
import styles from '../styles/modules/Offer.module.css'

type OfferProps = {
    offer: OfferType,
    onChooseOffer: (offer: OfferType) => void
}

const Offer: React.FC<OfferProps> = ({ offer, onChooseOffer }) => {
    const trimTime = (time: string) => {
        return time.length > 5 ? time.slice(0, -3): time
    }

    return (
        <article className={styles.offer}>
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

            <section className={styles.choice}>
                <div className={styles.price}>{offer.price} €</div>
                <Button onClick={() => onChooseOffer(offer)} appearance="primary" size="large" iconBefore={ChoseIcon}>
                    Alege
                </Button>
            </section>
        </article>
    )
}

export default Offer
