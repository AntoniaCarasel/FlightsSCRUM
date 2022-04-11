import React from 'react'
import { AirportType, FlightType } from '../interfaces'

type FlightContextProps = {
    setDeparture: (departure: AirportType) => void
    setArrival: (arrival: AirportType) => void
    setDate: (date: Date) => void
    flight: FlightType
    resetFlight: () => void
}

const FlightContext = React.createContext<FlightContextProps>({
    setDeparture: (_) => {},
    setArrival: (_) => {},
    setDate: (_) => {},
    flight: {},
    resetFlight: () => {}
})

const FlightProvider: React.FC = ({ children }) => {
    const [departure, setDeparture] = React.useState<AirportType>()
    const [arrival, setArrival] = React.useState<AirportType>()
    const [date, setDate] = React.useState<Date>()
    const [flight, setFlight] = React.useState({})

    React.useEffect(() => {
        setFlight({ departure, arrival, date })
    }, [departure, arrival, date])

    const resetFlight = () => {
        setDate(undefined)
        setArrival(undefined)
        setDeparture(undefined)
        setFlight({})
    }

    const context = React.useMemo(
        () => ({
            setDeparture,
            setArrival,
            setDate,
            flight,
            resetFlight
        }),
        [flight]
    )

    return <FlightContext.Provider value={context}>{children}</FlightContext.Provider>
}

const useFlight = () => React.useContext(FlightContext)

export default useFlight
export { FlightProvider }
