import { createItem, getItems, updateItem } from '@/modules/server/itemsClient'
import rateLimiter from '@/modules/server/redis-rate-limiter'
import Redis, { RedisOptions } from 'ioredis'
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'

const option: RedisOptions = {
    host: process.env.REDIS_HOST!,
    password: process.env.REDIS_PASSWORD!,
    port: parseInt(process.env.REDIS_PORT!, 10),
}
const client = new Redis(option)
const LIMIT_PER_SECOND = 3
const DURATION = 60

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const oid: string = req.headers['oid'] as string
    if (!oid) {
        res.status(401).json('Authentication failed')
        return
    }

    if (req.method === 'GET') {
        try {
            const identifier = requestIp.getClientIp(req)
            const result = await rateLimiter(
                client,
                identifier!,
                LIMIT_PER_SECOND,
                DURATION
            )
            res.setHeader('X-RateLimit-Limit', result.limit)
            res.setHeader('X-RateLimit-Remaining', result.remaining)

            if (!result.success) {
                res.status(429).json(
                    'Too many requests in 1 minute. Please try again in a few minutes.'
                )
                return
            }
            const items = await getItems()
            return res.status(200).json(items)
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({
                error: e.toString(),
            })
        }
    }

    if (req.method === 'POST') {
        if (oid !== 'admin') {
            res.status(403).json('Forbidden')
            return
        }
        try {
            const result = await createItem(req.body)
            return res.status(200).json(result)
        } catch (e: any) {
            console.log(e)
            return res.status(500).json({
                error: e.toString(),
            })
        }
    }
}
