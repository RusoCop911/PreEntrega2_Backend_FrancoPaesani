import fs from 'fs'

class ProductManager {
    constructor(filePath) {
        this.path = filePath
        this.products = []
    }

    async loadProducts() {
        try {
            const XXX = fs.existsSync(this.path)
            if (XXX) {
                const data = await fs.promises.readFile(this.path, 'utf8');
                this.products = JSON.parse(data);
            } else {
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            }

            return this.products
        } catch (error) {
            return 'Error loading products!'
        }
    }

    async addProduct(product) {
        try {
            await this.loadProducts()

            const {
                title, description, code, price, stock, category, thumbnails = [], status = true
            } = product

            if (!title || !description || !code || !price || !stock || !category) {
                return 'All fields are obligatory, except thumbnails'
            }

            if (this.products.some(p => p.code == code)) return 'Code already in use'

            const newID = this.products.reduce((max, product) => Math.max(max, product.id), 0) + 1

            const newProduct = {
                id: newID,
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnails,
            }

            this.products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            return newProduct
        } catch (error) {
            return error
        }
    }

    async getProducts() {
        try {
            await this.loadProducts()
            return this.products;
        } catch (error) {
            return error
        }
    }

    async getProductsByID(productID) {

        try {
            await this.loadProducts()
            const product = this.products.find(p => p.id == productID)

            if (product) {
                return product
            } else {
                console.error('Error: Product not found')
                return 'Error: Product not found'
            }
        } catch (error) {
            return error
        }
    }

    async updateProduct(productID, updatedProduct) {
        try {
            await this.loadProducts()

            const index = this.products.findIndex(p => p.id == productID)

            if (index === -1) {
                console.error('Error: Product not found')
                return 'Error!'
            }

            updatedProduct.id = productID

            this.products[index] = updatedProduct

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))

            return updatedProduct;
        } catch (error) {
            console.error('Error!')
            return 'Error!'
        }
    }

    async deleteProduct(productID) {
        try {
            await this.loadProducts()

            const productIndex = this.products.findIndex(p => p.id == productID)

            if (productIndex === -1) {
                console.error('Error: Product not found')
                return 'Error: Product not found'
            }

            this.products.splice(productIndex, 1)

            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))

            return `Product with ID ${productID} successfully erased`
        } catch (error) {
            return error
        }
    }

}

export default ProductManager