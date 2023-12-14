import fs from 'fs/promises'

class CartManager {
    constructor(filePath) {
        this.path = filePath
        this.carts = []
    }

    async saveCarts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2))
        } catch (err) {
            console.error('Error saving cart!')
        }
    }

    async loadCarts() {
        try {
            const data = await fs.readFile(this.path)
            this.carts = JSON.parse(data)
        } catch (err) {
            console.error('Error loading cart!')
        }
    }

}

export default CartManager