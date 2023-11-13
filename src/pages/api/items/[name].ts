import { updateItem } from '@/modules/server/itemsClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const oid: string = req.headers['oid'] as string
    const itemName = req.query.name as string

    if (!oid) {
        res.status(401).json('Authentication failed')
        return
    }

    if (req.method === 'PUT') {
        if (oid !== 'admin') {
            res.status(403).json('Forbidden')
            return
        }
        if (!req.body.quantity) {
            res.status(400).json('Bad Request')
            return
        }
        try {
            const result = await updateItem(
                itemName,
                req.body.quantity,
            )
            return res.status(200).json(result)
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({
                error: e.toString(),
            })
        }
    }
}
