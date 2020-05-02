const mysql = require('../models/mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Inserir usuário
exports.insertUser = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        const results = await mysql.execute(query, [req.body.email])
        if (results.length > 0) {
            res.status(409).send({ mensage: 'Usuário já cadastrado' })
        } else {
            bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                const query = 'INSERT INTO usuarios (email, senha) VALUES (?,?)'
                const result = mysql.execute(query, [req.body.email, hash]);
                const response = {
                    mensage: 'Usuário inserido com sucesso!',
                    insert_user_detail: {
                        user_id: result.insertId,
                        email: req.body.email
                    }
                }
                return res.status(201).send({ response })
            })
        }
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

//Login usuário
exports.loginUser = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM usuarios WHERE email = ?'
        const results = await mysql.execute(query, [req.body.email])
        if (results.length < 1) {
            return res.status(401).send({ mensage: 'Falha na autênticação' })
        }
        bcrypt.compare(req.body.senha, results[0].senha, (error, result) => {
            if (error) {
                return res.status(401).send({ mensage: 'Falha na autênticação' })
            } if (result) {
                const token = jwt.sign({
                    user_id: results[0].id_usuario,
                    email: results[0].email
                }, process.env.JWT_KEY,
                    { expiresIn: '1h' })
                return res.status(200).send({
                    mensage: 'Usuário autênticado com sucesso!',
                    token: token
                })
            }
            return res.status(401).send({ mensage: 'Falha na autênticação' })
        })
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}