const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

// rotas importadas
const producstRoute = require('./models/routes/products')
const ordersRoute = require('./models/routes/orders')
const usersRoute = require('./models/routes/users')

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// configuração CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header-Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Method', 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).send({})
    }

    next()
})

// rotas definidas
app.use('/produtos', producstRoute)
app.use('/pedidos', ordersRoute)
app.use('/usuarios', usersRoute)

// rotas não encontradas
app.use((req, res, next) => {
    const erro = new Error('Não encontrado')
    erro.status = 404
    next(erro)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            mensagem: error.message
        }
    })
})

module.exports = app