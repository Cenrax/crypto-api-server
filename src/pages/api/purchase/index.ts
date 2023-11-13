import { getItem, updateItem } from '@/modules/server/itemsClient'
import {
    createPurchase,
    getPurchaseLogs,
} from '@/modules/server/purchaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const oid: string = req.headers['oid'] as string

    if (!oid || oid !== 'user') {
        res.status(401).json('Authentication failed')
        return
    }

    if (req.method === 'GET') {
        try {
            const logs = await getPurchaseLogs()
            return res.status(200).json(logs)
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({
                error: e.toString(),
            })
        }
    }

    if (req.method === 'POST') {
        if (
            req.body.item !== 'Chair' &&
            req.body.item !== 'Table' &&
            req.body.item !== 'Lamp' &&
            req.body.item !== 'Laptop'
        ) {
            res.status(400).json('Bad Request')
            return
        }

        if (!req.body.quantity) {
            res.status(400).json('Bad Request')
            return
        }
        try {
            const existingItem = await getItem(req.body.item)
            if (!existingItem) {
                res.status(400).json('Item does not exist')
                return
            }
            if (existingItem.quantity < req.body.quantity) {
                res.status(400).json('Not enough items in stock')
                return
            }
            const result = await createPurchase(
                oid,
                req.body.item,
                req.body.quantity
            )
            await updateItem(
                req.body.item,
                existingItem.quantity - req.body.quantity
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
