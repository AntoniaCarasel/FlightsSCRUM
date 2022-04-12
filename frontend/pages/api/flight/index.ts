import type { NextApiRequest, NextApiResponse } from 'next'

export default async function flightHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed!' })
    }

    let body = {} as any;

    try {
        body = JSON.parse(req.body)
    } catch (error) {
        return res.status(400).json({
            message: 'Invalid JSON!'
        })
    }

    const { departingAirport, arrivingAirport, flightDate, company, etd, eta, price } = body

    if (!departingAirport || !arrivingAirport) {
        return res.status(400).json({ message: 'Missing departingAirport or arrivingAirport from body!' })
    }

    if (!company) {
        return res.status(400).json({ message: 'Missing company!' })
    }

    if (!flightDate || !etd || !eta) {
        return res.status(400).json({ message: 'Missing flightDate, etd or eta!' })
    }

    if (typeof price !== 'number' || Number.isNaN(price)) {
        return res.status(400).json({ message: 'Missing price!' })
    }

    if (!departingAirport.id || !arrivingAirport.id) {
        return res.status(400).json({ message: 'Missing id from departingAirport or arrivingAirport!' })
    }

    if (!company.id) {
        return res.status(400).json({ message: 'Missing company id!' })
    }

    if (typeof etd !== 'string' || typeof eta !== 'string')
        return res.status(400).json({ message: 'Properties etd and eta must be strings!' })

    try {
        let response = await fetch([process.env.BACKEND_LOCATION, 'route'].join('/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                departingAirport: { id: departingAirport.id },
                arrivingAirport: { id: arrivingAirport.id }
            })
        })

        console.log({
            departingAirport: { id: departingAirport.id },
            arrivingAirport: { id: arrivingAirport.id }
        })

        let data = await response.json()

        if (!data || typeof data.id !== 'number' || Number.isNaN(data.id)) {
            return res.status(500).json({ message: 'Could not obtain a valid route id!' })
        }

        const route = { id: data.id }

        response = await fetch([process.env.BACKEND_LOCATION, 'flight'].join('/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                route,
                company: { id: company.id },
                flightDate,
                etd,
                eta,
                price
            })
        })

        console.log({
            route,
            company: { id: company.id },
            flightDate,
            etd,
            eta,
            price
        })
        console.log(response.status)

        if (response.status !== 201) {
            return res.status(500).json({
                message: 'Could not comunicate with oltp back-end!'
            })
        }

        return res.status(response.status).json({ message: 'Created!' })
    } catch (error) {
        console.error('Eroare la adăugarea unui nou zbor', error)
        return res.status(500).json({
            message: 'Internal Error!'
        })
    }
}
