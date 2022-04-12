import React from 'react'

import styles from '../styles/modules/BestOffer.module.css'

type BestOfferProps = {
    label: string
    price: number
}

const BestOffer: React.FC<BestOfferProps> = ({ label, price }) => {
    return (
        <div className={styles.bestOffer}>
            <div>{label}</div>
            <span className={styles.price}>{price} €</span>
        </div>
    )
}

export default BestOffer
