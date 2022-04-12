import type { NextApiRequest, NextApiResponse } from 'next'
import { promisify } from 'util'
import fs from 'fs'

import { ADMINS } from '../../../mock'
import { UserType } from '../../../interfaces'

type Data = {
    message: string
    payload?: any
}

export default async function authHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Only PUT requests allowed!' })
    }

    const { email, password } = req.body

    // let response
    // try {
    //   const endpoint = new URL('/v1/admin', AUTH_SERVICE_DOMAIN).href
    //   response = await fetch(endpoint, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    //   })
    // } catch (error) {
    //   return res.status(500).json({
    //     message: 'Internal Error!',
    //   })
    // }
    //
    // try {
    //   const data = await response.json()
    //   return res.status(response.status).json(data)
    // } catch (error) {
    //   return res.status(500).json({
    //     message: 'Internal Error!',
    //   })
    // }

    let isAdmin = true
    let [user] = ADMINS.filter((user) => user.email === email && password === 'admin')

    if (!user) {
        isAdmin = false
        const file = await promisify(fs.readFile)('./pages/api/auth/users.json', { encoding: 'utf-8' })
        const users = JSON.parse(file) as UserType[]
        ;[user] = users.filter((user) => user.email === email && password === 'demo')
    }

    if (user) {
        return res.status(200).json({
            message: 'Ok!',
            payload: { user, isAdmin }
        })
    }

    return res.status(403).json({ message: 'Not authorized!' })
}
