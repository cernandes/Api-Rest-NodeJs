const express = require('express')
const router = express.Router()
const ordersController = require('../controllers/orders-controller')

router.get('/', ordersController.getAllOrders)
router.get('/:id_pedidos', ordersController.getOneOrder)
router.post('/', ordersController.insertOrder)
router.delete('/:id_pedidos', ordersController.deleteOrder)

module.exports = router