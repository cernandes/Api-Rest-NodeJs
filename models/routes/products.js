const express = require('express')
const router = express.Router()
const multer = require('multer')
const login = require('../midllewares/login')
const jwt = require('jsonwebtoken')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace('T', ',').replace(':', '').replace(':', '').replace('.', '').replace('Z', '') + file.originalname);

    }

})
const fileFilter = (re, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

const productController = require('../controllers/products-controller')
router.get('/', productController.getAllProducts)
router.post('/', login.mandatoryLogin, upload.single('produto_imagem'), productController.insertProduct)
router.get('/:id_produto', productController.getOneProduct)
router.put('/:id_produto', login.mandatoryLogin, productController.updateProduct)
router.delete('/:id_produto', login.mandatoryLogin, productController.deleteProduct);

module.exports = router