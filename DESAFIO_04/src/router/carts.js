import express from 'express'
import CartManager from '../../cartManager.js'
import ProductManager from '../../productManager.js'

const router = express.Router()
const manager = new CartManager('./carts.json')
const productManager = new ProductManager('./products.json')

router.post('/', async (req, res) => {
    try {
        await manager.loadCarts()
        await productManager.loadProducts()

        const newID = manager.carts.reduce((max, cart) => Math.max(max, cart.id), 0) + 1

        const newCart = {
            id: newID,
            products: [],
        }

        manager.carts.push(newCart)

        await manager.saveCarts()

        res.status(200).json(newCart)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid

    try {
        await manager.loadCarts()

        const cart = manager.carts.find(c => c.id == cartID)

        if (!cart) {
            return res.status(400).json({ error: 'Cart not found!' })
        }

        const existingProduct = cart.products.find(item => item.product === productID)

        if (existingProduct) {
            existingProduct.quantity += 1
        } else {
            cart.products.push({ product: productID, quantity: 1 })
        }

        await manager.saveCarts()

        return res.status(200).json(cart)
    } catch (error) {
        return res.status(400).json({ error: 'Error!' })
    }
})

router.get('/:cid', async (req, res) => {
    const cartID = req.params.cid

    try {
        await manager.loadCarts()

        const cart = manager.carts.find(c => c.id == cartID)

        if (!cart) {
            return res.status(400).json({ error: 'Cart not found!' })
        }

        return res.status(200).json(cart.products)
    } catch (error) {
        return res.status(400).json({ error: 'Error!' })
    }
})

export default router
