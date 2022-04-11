import type { NextApiRequest, NextApiResponse } from 'next'

export default async function reservationHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed!' })
    }

    try {
        const response = await fetch([process.env.BACKEND_LOCATION, 'reservation'].join('/'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: req.body
        })

        if (response.status !== 201) {
            return res.status(response.status).json({ message: 'Not created' })
        }

        return res.status(response.status).json({ message: 'Created!', payload: true })
    } catch (error) {
        console.error('Eroare la preluarea detaliilor zborului', error)
        return res.status(500).json({
            message: 'Internal Error!'
        })
    }
}
