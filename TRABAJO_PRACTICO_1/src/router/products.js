import express from 'express'
import ProductManager from '../../productManager.js'
const router = express.Router()

const manager = new ProductManager('./products.json')


router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await manager.getProducts()

        if (limit) {
            const productLimit = products.slice(0, limit)
            return res.status(200).json(productLimit)
        }
        return res.status(200).json(products)
    } catch (error) {
        return res.status(400).json(error.message)
    }
});

router.get('/:pid', async (req, res) => {
    const productID = req.params.pid

    try {
        const product = await manager.getProductsByID(productID)

        return res.status(200).json(product)
        
    } catch (error) {
        return error
    }
});

router.post('/', async (req, res) => {
    try {
        const product = req.body
        const newProduct = await manager.addProduct(product)
        return res.status(200).json(newProduct)
    } catch (error) {
        return res.status(400).json(error.message)
    }
});

router.put('/:pid', async (req, res) => {
    const productID = req.params.pid
    const updatedProduct = req.body

    try {
        const existingProduct = await manager.getProductsByID(productID)

        if (existingProduct.userMessage) {
            return res.status(404).json({ error: existingProduct.userMessage })
        }

        const updated = await manager.updateProduct(productID, updatedProduct)

        if (updated.userMessage) {
            return res.status(404).json({ error: updated.userMessage })
        }

        return res.status(200).json(updated)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})

router.delete('/:pid', async (req, res) => {
    const productID = req.params.pid

    try {
        const result = await manager.deleteProduct(productID)
        res.status(200).send(result)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})

export default router
