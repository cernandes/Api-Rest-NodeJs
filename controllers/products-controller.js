const mysql = require('../models/mysql');

//retornar todos os produtos
exports.getAllProducts = async (req, res, next) => {
    try {
        const result = await mysql.execute('SELECT * FROM produtos;');
        const response = {
            amount_total_products: result.length,
            products: result.map(prod => {
                return {
                    product_details: {
                        product_id: prod.id_produto,
                        name: prod.nome,
                        price: prod.preco,
                        product_image: prod.imagem_produto
                    },
                    request_details: {
                        type: 'GET',
                        description: 'Retorna todos os produtos',
                        url: 'http://127.0.0.1:3000/produtos/' + prod.id_produto
                    },
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

//retornar um produto
exports.getOneProduct = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM produtos WHERE id_produto =?'
        const result = await mysql.execute(query, [req.params.id_produto]);
        if (result.length == 0) { return res.status(404).send({ mensagem: 'Não encontrado produto com este ID' }) }
        const response = {
            product_details: {
                product_id: result[0].id_produto,
                name: result[0].nome,
                price: result[0].preco,
                product_image: result[0].imagem_produto,
                request_details: {
                    type: 'GET',
                    description: 'Retorna os detalhes de um produto específico',
                    url: 'http://127.0.0.1:3000/produtos'
                }
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

//inserir produto
exports.insertProduct = async (req, res, next) => {
    try {
        const query = 'INSERT INTO produtos (nome, preco, imagem_produto) VALUES (?,?,?)';
        const result = await mysql.execute(query, [req.body.nome, req.body.preco, req.file.path]);
        const response = {
            mensage: 'Produto inserido com sucesso!',
            product_insert_details: {
                product_id: result.id_produto,
                name: req.body.nome,
                price: req.body.preco,
                product_image: req.body.path
            },
            request_details: {
                type: 'POST',
                description: 'Insere um produto',
                url: 'http://127.0.0.1:3000/produtos'
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

//alterar produto
exports.updateProduct = async (req, res, next) => {
    try {
        const query = 'UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?';
        await mysql.execute(query, [req.body.nome, req.body.preco, req.body.id_produto]);
        const response = {
            mensage: 'Produto Atualizado com sucesso!',
            update_product_details: {
                product_id: req.body.id_produto,
                name: req.body.nome,
                price: req.body.preco,
                request_details: {
                    type: 'PUT',
                    description: 'Retorna os detalhes da alteração',
                    url: 'http://127.0.0.1:3000/produtos/' + req.body.id_produto
                }
            }
        }
        res.status(202).send({ response })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

//deletar produto
exports.deleteProduct = async (req, res, next) => {
    try {
        const query = 'DELETE FROM produtos WHERE id_produto = ?'
        await mysql.execute(query, [req.body.id_produto])
        const response = {
            mensage: 'Produto excluído com sucesso!',
            request_details: {
                type: 'DELETE',
                description: 'Remove um produto pelo ID',
                url: 'http://127.0.0.1:3000/produtos'
            }
        }
        res.status(202).send({ response })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}