import { Router } from "express"

const router = Router()

const municiones = [
    {name: 'FM', price: 100},
    {name: 'Magtech', price: 150},
    {name: 'Remington', price: 250},
    {name: 'Hornady', price: 200}
]

router.get('/', (req, res) => {

    const user = {
        name: 'Franco',
        isAdmin: true
    }

    res.render('index', {
        user,
        municiones,
        title: 'Web de Armamento',
        style: 'index.css'
    })
})

router.get('/register', (req, res) => {
    res.render('register', {})
})

export default router