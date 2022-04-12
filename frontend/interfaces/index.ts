export type OfferType = {
    id: number,
    departure: {
        location: string
        time: string
    }
    arrival: {
        location: string
        time: string
    }
    price: number
    company: CompanyType
}

export type AirportType = {
    id: number,
    code: string // IATA code
    country: string
    location: string
}

export type FlightType = {
    departure?: AirportType
    arrival?: AirportType
    date?: Date
}

export type FlightDetailsType = {
    etd: string,
    eta: string,
    price: number,
    company: CompanyType
}

export type UserType = {
    firstName: string
    lastName: string
    phone: string
    email: string
    isAdmin: boolean
}

export type ServiceType = {
    name: string
    price: number
}

export type CompanyType = {
    name: string
    id: number
}

export type RouteType = {
    id: number,
    departingAirport: AirportType
    arrivingAirport: AirportType
}

