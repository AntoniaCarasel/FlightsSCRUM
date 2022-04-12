import { AirportType, CompanyType, FlightDetailsType, RouteType, ServiceType } from '../interfaces'

export async function getAirports() {
    let airports: AirportType[] = []

    try {
        const response = await fetch([process.env.BACKEND_LOCATION, 'airport'].join('/'))
        const data = await response.json()
        airports = data.map((airport: any) => {
            return {
                id: airport.id,
                code: airport.code,
                location: airport.name,
                country: airport.city.country.name
            }
        }) as AirportType[]
    } catch (error) {
        console.error('Eroare la preluarea aeroporturilor', error)
    }

    return airports
}

export async function getCompanies() {
    let companies: CompanyType[] = []

    try {
        const response = await fetch([process.env.BACKEND_LOCATION, 'company'].join('/'))
        const data = await response.json()
        companies = data.map((company: any) => {
            return {
                name: company.name,
                id: company.id
            }
        }) as CompanyType[]
    } catch (error) {
        console.error('Eroare la preluarea companiilor', error)
    }

    return companies
}

export async function getRoutes() {
    let routes: RouteType[] = []

    try {
        const response = await fetch([process.env.BACKEND_LOCATION, 'route'].join('/'))
        const data = await response.json()
        routes = data.map((route: any) => {
            return {
                id: route.id,
                arrivingAirport: {
                    id: route.arrivingAirport.id,
                    code: route.arrivingAirport.code,
                    location: route.arrivingAirport.name,
                    country: route.arrivingAirport.city.country.name
                } as AirportType,
                departingAirport: {
                    id: route.departingAirport.id,
                    code: route.departingAirport.code,
                    location: route.departingAirport.name,
                    country: route.departingAirport.city.country.name
                } as AirportType
            } as RouteType
        })
    } catch (error) {
        console.error('Eroare la preluarea rutelor', error)
    }

    return routes
}

export async function getFlights(routeId: number, date: string): Promise<FlightDetailsType[]> {
    try {
        const response = await fetch(['api', 'details', routeId].join('/') + `?date=${date}`, {
            method: 'PUT'
        })
        const body = await response.json()
        return body.payload
    } catch (error) {
        console.error('Eroare la preluarea detaliilor zborului', error)
        return []
    }
}

export async function getCompanyServices(companyId: number): Promise<ServiceType[] | undefined> {
    try {
        const response = await fetch(['api', 'company', companyId].join('/'))
        const body = await response.json()
        const data = body.payload
        return data.services
    } catch (error) {
        console.error('Eroare la preluarea detaliilor serviciilor', error)
        return []
    }
}

export async function addFlight(
    departingAirport: AirportType,
    arrivingAirport: AirportType,
    company: CompanyType,
    flightDate: string,
    etd: string,
    eta: string,
    price: number
) {
    try {
        const response = await fetch(['api', 'flight'].join('/'), {
            method: 'POST',
            body: JSON.stringify({
                departingAirport: {
                    id: departingAirport.id
                },
                arrivingAirport: {
                    id: arrivingAirport.id
                },
                company: {
                    id: company.id
                },
                flightDate,
                etd,
                eta,
                price
            })
        })
        return response.status === 201
    } catch (error) {
        // @ts-ignore
        console.error('Eroare la adăugarea unui nou zbor', error?.message)
        return false
    }
}

export async function addReservation(
    data: string,
    description: string,
    flightId: number,
    accountId: number
) {
    try {
        const response = await fetch(['api', 'reservation'].join('/'), {
            method: 'POST',
            body: JSON.stringify({
                data,
                description,
                flight: { id: flightId },
                account: { id: accountId }
            })
        })
        return response.status === 201
    } catch (error) {
        // @ts-ignore
        console.error('Eroare la adăugarea unei noi rezervări', error?.message)
        return false
    }
}

const statistics = {
    getClientsWithMostFlights: async (limit = 100) => {
        try {
            const response = await fetch([process.env.DW_LOCATION, 'clientsWithMostFlights'].join('/'), {
                body: JSON.stringify({
                    startDate: '01011970',
                    endDate: '01252022'
                })
            })
            const data = await response.json()
            console.log({ data })
            const clients = data.slice(0, limit)
            return clients
        } catch (error) {
            console.error('Eroare la preluarea clienților cu cele mai multe zboruri!', error)
            return []
        }
    },

    getBestSalesCompanies: async () => {
        try {
            const response = await fetch([process.env.DW_LOCATION, 'bestSalesCompanies'].join('/'))
            return await response.json()
        } catch (error) {
            console.error('Eroare la preluarea companiilor cu cele mai multe vânzări!', error)
            return []
        }
    },

    getRoutesFlightsWithMostUsedSeats: async () => {
        try {
            const response = await fetch([process.env.DW_LOCATION, 'routesFlightsWithMostUsedSeats'].join('/'))
            return await response.json()
        } catch (error) {
            console.error('Eroare la preluarea celor mai populare rute!', error)
            return []
        }
    },

    getMostUsedAirplaneType: async () => {
        try {
            const response = await fetch([process.env.DW_LOCATION, 'mostUsedAirplaneType'].join('/'))
            return await response.json()
        } catch (error) {
            console.error('Eroare la preluarea celui mai popular tip de avion!', error)
            return undefined
        }
    },

    getBestTrafficAirports: async () => {
        try {
            const response = await fetch([process.env.DW_LOCATION, 'bestTrafficAirports'].join('/'))
            return await response.json()
        } catch (error) {
            console.error('Eroare la preluarea celui mai aglomerat aeroport!', error)
            return undefined
        }
    }
}

export { statistics }
