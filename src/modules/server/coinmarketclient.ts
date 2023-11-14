import axios from 'axios'

export async function fetchPrice() {
    try {
        const response = await axios.get(
            'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=ETH',
            {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
                },
            }
        )
        const price = response.data.data.ETH[0].quote.USD.price
        return price
    } catch (ex) {
        // error
        console.error(ex)
        throw ex // propagate the error
    }
}
