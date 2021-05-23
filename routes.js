const express = require('express');
const router = express.Router();
const product_controller = require('./controller/product');
const user_controller = require("./controller/user")

function middleware (req, res, next) {

    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    user_controller.get_user(login).exec(function (err, user) {
        if (login && password && login === user.name && password === user.password) {
            
            return next()
        }
        
        return next()
    })
}
router.get('/',  middleware, function(req, res, next) {
    res.json({ express: 'Express connected to angular' });
});

router.post('/products', middleware,product_controller.product_get_all);
router.get('/products/:id', middleware,product_controller.product_details);
router.post('/products/add', middleware,product_controller.product_create);
router.put('/products/:id',middleware, product_controller.product_update);
router.post('/products/delete/:id', middleware, product_controller.product_delete);

module.exports = router;