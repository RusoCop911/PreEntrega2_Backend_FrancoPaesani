import express from 'express'
import productsRouter from './router/products.js'
import cartsRouter from './router/carts.js'
import { configureMulter } from './app_multer.js' 
import handlebars from 'express-handlebars'
import viewsRouter from './router/views.js'
import usersRouter from './router/users.js'
import __dirname from './utils.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    console.log(`[${req.url}] Time: ${new Date().toLocaleTimeString()}`)
    next()
})

app.use('/static', express.static(__dirname + '/public'))

// app.get('/', (req, res) => res.send('OK'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

configureMulter(app)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/user', usersRouter)

app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto 8080`)
})
