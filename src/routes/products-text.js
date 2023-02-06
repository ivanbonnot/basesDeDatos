const { Router } = require("express")
const mock = require('../controllers/fakermock')
const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    const productos = await mock.getAll();

    res.json(productos);
})


export default productsRouter;

