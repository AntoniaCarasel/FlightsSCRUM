import type { NextApiRequest, NextApiResponse } from 'next'

export default async function detailsHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Only PUT requests allowed!' })
    }

    const routeId = req.query.id
    const date = req.query.date

    try {
        const response = await fetch([process.env.BACKEND_LOCATION, 'flight'].join('/'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: routeId
            })
        })
        const data = await response.json()

        const payload = [];

        for (let flight of data) {
            if (flight.flightDate !== date) {
                continue;
            }

            payload.push({
                id: flight.id,
                etd: flight.etd,
                eta: flight.eta,
                price: flight.price,
                company: {
                    id: flight.company.id,
                    name: flight.company.name
                }
            })
        }

        return res.status(200).json({
            message: 'Ok!',
            payload
        })
    } catch (error) {
        console.error('Eroare la preluarea detaliilor zborului', error)
        return res.status(500).json({
            message: 'Internal Error!'
        })
    }
}
