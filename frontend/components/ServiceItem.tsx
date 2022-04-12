import React from 'react'
import { Checkbox } from 'evergreen-ui'

import { ServiceType } from '../interfaces'
import styles from '../styles/modules/ServiceItem.module.css'

type ServiceItemProps = {
    service: ServiceType
    onClick?: React.MouseEventHandler<HTMLElement>
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, onClick }) => {
    const [isChecked, setIsChecked] = React.useState(false)

    const handleOnClick = async (e: React.MouseEvent<HTMLElement>) => {
        setIsChecked(isChecked => !isChecked);
        e.currentTarget.classList.toggle('active');
        if (onClick) {
            await onClick(e)
        }
    }

    return (
        <article data-price={service.price} className={`${styles.item} service`} onClick={handleOnClick}>
            <Checkbox style={{ pointerEvents: 'none' }} checked={isChecked} onClick={() => {}} />
            <h4>{service.name}</h4>
            <strong>{service.price} €</strong>
        </article>
    )
}

export default ServiceItem