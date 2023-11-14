export function calculateItemPrice(item: string, ethPrice: number): number {
    switch (item) {
        case 'Chair':
            return ethPrice * 0.1
        case 'Table':
            return ethPrice * 0.2
        case 'Lamp':
            return ethPrice * 0.3
        case 'Laptop':
            return ethPrice * 0.8
        default:
            return ethPrice * 0.5
    }
}
