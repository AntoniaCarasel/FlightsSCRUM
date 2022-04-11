import type { NextApiRequest, NextApiResponse } from 'next'

export default async function detailsHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Only GET requests allowed!' });
    }

    const companyId = req.query.id

    try {
        const response = await fetch([process.env.BACKEND_LOCATION, 'company', companyId].join('/'))
        const data = await response.json()
        return res.status(200).json({
            message: 'Ok!',
            payload: {
                services: data.services
            }
        })
    } catch (error) {
        console.error('Eroare la preluarea detaliilor zborului', error)
        return res.status(500).json({
            message: 'Internal Error!',
        })
    }
}