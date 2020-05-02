const mysql = require('../models/mysql')

//Retornar todos pedidos
exports.getAllOrders = async (req, res, next) => {
    try {
        const result = await mysql.execute(`
             SELECT pedidos.id_pedido,
                    pedidos.quantidade,
                    produtos.id_produto,
                    produtos.nome,
                    produtos.preco
               FROM pedidos
         INNER JOIN produtos
                 ON produtos.id_produto = pedidos.id_produto`)
        const response = {
            amount_total_orders: result.length,
            orders: result.map(order => {
                return {
                    order_details: {
                        order_id: order.id_pedido,
                        name: order.nome,
                        price: order.preco,
                        quantity: order.quantidade,
                    },
                    request_details: {
                        type: 'GET',
                        description: 'Retorna todos os pedidos',
                        url: 'http://127.0.0.1:3000/pedidos/' + order.id_pedido
                    }
                }
            })
        }
        return res.status(200).send({ response })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

//Retornar um pedido
exports.getOneOrder = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM pedidos WHERE id_pedido =?'
        const result = await mysql.execute(query, [req.params.id_pedidos])
        if (result.length == 0) {
            return res.status(404).send({
                mensage: 'Não foi encontrado pedido com este ID'
            })
        }
        const response = {
            order_details: {
                order_id: result[0].id_pedido,
                product_id: result[0].id_produto,
                quantity: result[0].quantidade
            },
            request_details: {
                type: 'GET',
                description: 'Retorna os detalhes de um pedido específico',
                url: 'http://127.0.0.1:3000/pedidos' + result[0].id_pedido
            }
        }
        return res.status(200).send({ response })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

//Inserir pedido
exports.insertOrder = async (req, res, next) => {
    try {
        const query = 'INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)'
        const result = await mysql.execute(query, [req.body.id_produto, req.body.quantidade])

        const response = {
            mensage: 'Pedido inserido com sucesso!',
            order_details: {
                order_id: result.id_pedido,
                product_id: req.body.id_produto,
                quantity: req.body.quantidade
            },
            request_details: {
                type: 'POST',
                description: 'Insere um pedido',
                url: 'http://127.0.0.1:3000/pedidos/'
            }
        }
        res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

//Excluir pedido
exports.deleteOrder = async (req, res, next) => {
    try {
        const query = 'DELETE FROM pedidos WHERE id_pedido = ?'
        await mysql.execute(query, [req.body.id_pedido])
        const response = {
            mensage: 'Pedido removido com sucesso!',
            request_details: {
                type: 'DELETE',
                description: 'Remove um pedido da específico pelo ID',
                url: 'http://127.0.0.1:3000/pedidos'
            }
        }
        res.status(202).send({ response })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
