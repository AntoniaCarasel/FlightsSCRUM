import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import { promisify } from 'util'

type Data = {
    message: string
    payload?: any
}

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed!' })
    }

    const { firstName, lastName, phone, email } = req.body

    const file = await promisify(fs.readFile)('./pages/api/auth/users.json', { encoding: 'utf-8' })
    const users = JSON.parse(file)

    users.push({ firstName, lastName, phone, email })

    await promisify(fs.writeFile)('./pages/api/auth/users.json', JSON.stringify(users, null, 2))

    return res.status(201).json({
        message: 'Created!'
    })
}
