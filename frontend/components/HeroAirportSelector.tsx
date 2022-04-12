import React from 'react'
import { AirplaneIcon, Button, Pane, Position, SelectMenu } from 'evergreen-ui'
import { GiAirplaneArrival as AirplaneArrivalIcon, GiAirplaneDeparture as AirplaneDepartureIcon } from 'react-icons/gi'

import type { AirportType } from '../interfaces'
import useFlight from "../hooks/useFlight";

type HeroAirportSelectorProps = {
    className?: string
    airports: AirportType[]
    type: 'departure' | 'arrival'
    title: string
    isInvalid?: boolean
}

const HeroAirportSelector: React.FC<HeroAirportSelectorProps> = ({ airports, type, title, className, isInvalid }) => {
    const [code, setCode] = React.useState('')
    const [value, setValue] = React.useState('')
    const [isDanger, setIsDanger] = React.useState(false)
    const { setDeparture, setArrival } = useFlight()

    let icon;

    if (type === "departure") {
        icon = AirplaneDepartureIcon;
    }  else if (type === "arrival") {
        icon = AirplaneArrivalIcon;
    }

    React.useEffect(() => {
        setIsDanger(!!isInvalid)
    }, [isInvalid])

    return (
        <Pane className={`${className || ''} airport-selector`}>
            <SelectMenu
                title={title}
                options={airports.map((airport) => ({
                    label: `(${airport.code}) ${airport.location}, ${airport.country}`,
                    value: airport.code
                }))}
                position={Position.BOTTOM}
                selected={code}
                filterPlaceholder="Caută un aeroport"
                filterIcon={AirplaneIcon}
                onSelect={(selected) => {
                    const airport = airports.find((airport) => airport.code === selected.value)
                    if (!airport) {
                        return
                    }

                    setCode(airport.code)
                    setValue(`(${airport.code}) ${airport.location}, ${airport.country}`)
                    setIsDanger(false)

                    if (type === 'departure') {
                        console.log('setDeparture')
                        setDeparture(airport)
                        return;
                    }

                    if (type === 'arrival') {
                        console.log('setArrival')
                        setArrival(airport)
                        return;
                    }

                }}
                onDeselect={() => {
                    setCode('')
                    setValue('')
                }}
            >
                <Button intent={isDanger ? 'danger' : 'default'} iconBefore={icon}>{(value && value.slice(0, 25) + '...') || title}</Button>
            </SelectMenu>
        </Pane>
    )
}

export default HeroAirportSelector