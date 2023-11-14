import { fetchPrice } from './coinmarketclient'
import clientPromise from './mongodb'

const DB_NAME = process.env.DB_NAME as string

export interface Item {
    item: string
    description: string
    quantity: number
    price?: number
    currency?: string
}

export async function getItems() {
    const client = await clientPromise
    const collection = client.db(DB_NAME).collection<Item>('items')
    const items = await collection.find({}).toArray()
    const ethPrice = await fetchPrice()

    const itemResults = items.map((item) => {
        switch (item.item) {
            case 'Chair':
                item.price = ethPrice * 0.1
                break
            case 'Table':
                item.price = ethPrice * 0.2
                break
            case 'Lamp':
                item.price = ethPrice * 0.3
                break
            case 'Laptop':
                item.price = ethPrice * 0.8
                break
            default:
                item.price = ethPrice * 0.5
        }

        return {
            item: item.item,
            price: item.price,
            quantity: item.quantity,
            description: item.description,
            currency: 'USD',
        }
    })
    return itemResults
}

export async function createItem(item: Item) {
    const client = await clientPromise
    const collection = client.db(DB_NAME).collection<Item>('items')

    const result = await collection.insertOne(item)
    return result
}

export async function updateItem(item: string, quantity: number) {
    const client = await clientPromise
    const collection = client.db(DB_NAME).collection<Item>('items')
    const result = await collection.findOneAndUpdate(
        { item: item },
        { $set: { quantity: quantity } }
    )
    return result
}

export async function getItem(name: string) {
    const client = await clientPromise
    const collection = client.db(DB_NAME).collection<Item>('items')
    const result = await collection.findOne({ item: name })
    return result
}
