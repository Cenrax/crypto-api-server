import { calculateItemPrice } from '@/utils/priceCalculator'
import { fetchPrice } from './coinmarketclient'
import clientPromise from './mongodb'

export interface PurchaseLog {
    userId: string
    itemName: string
    datePurchased: Date
    quantity: number
    amountPaid: number
}
const DB_NAME = process.env.DB_NAME as string

export async function getPurchaseLogs() {
    const client = await clientPromise
    const collection = client
        .db(DB_NAME)
        .collection<PurchaseLog>('purchaseLogs')
    const logs = await collection.find({}).toArray()
    return logs
}

export async function createPurchase(
    userId: string,
    itemName: string,
    quantity: number
) {
    const client = await clientPromise
    const ethPrice = await fetchPrice()
    const itemPrice = calculateItemPrice(itemName, ethPrice)
    const amountPaid = itemPrice * quantity
    const log: PurchaseLog = {
        userId,
        itemName,
        datePurchased: new Date(),
        quantity,
        amountPaid,
    }
    const collection = client
        .db(DB_NAME)
        .collection<PurchaseLog>('purchaseLogs')
    const result = await collection.insertOne(log)

    return result
}
