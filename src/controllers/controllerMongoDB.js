const productoModel = require("../models/productoModel")
const cartModel = require("../models/cartModel")

class ControllerMongoDb {

    saveProduct = async (productToAdd) => {
        console.log("guardado", productToAdd)
        const product = new productoModel(productToAdd);
        await product.save();
        console.log("guardado", product)
    };

    getProducts = async () => await productoModel.find({});

    getProductById = async (id) => await productoModel.findOne({ _id: id });

    updateProduct = async (id, productToUpdate) => {
        return await productoModel.updateOne(
            { _id: id },
            { $set: { ...productToUpdate } }
        );
    };

    deleteProduct = async (id) => await productoModel.deleteOne({ _id: id });


    saveCart = async (cartToAdd) => {
        const cart = new cartModel(cartToAdd);
        await cart.save();
    };

    getCarts = async () => await cartModel.find({});

    getCartById = async (id) => await cartModel.findOne({ _id: id });

    deleteCart = async (id) => await cartModel.deleteOne({ _id: id });

    addProductInCart = async (id, id_prod) => {
        const cart = await this.getCartById(id);

        const isInCart = () =>
            cart.productos.find((product) => product.id === id_prod) ? true : false;

        if (!isInCart()) {
            await cartModel.updateOne(
                { _id: id },
                {
                    $set: {
                        productos: [...cart.productos, { id: id_prod, quantity: 1 }],
                    },
                }
            );
            return;
        }

        const indexProductUpdate = cart.productos.findIndex(
            (product) => product.id === id_prod
        );

        cart.productos[indexProductUpdate].quantity++;

        await cartModel.updateOne(
            { _id: id },
            { $set: { productos: [...cart.productos] } }
        );
    };

    deleteProductInCart = async (id_cart, id_prod) => {
        const cart = await cartModel.findOne({ _id: id_cart });

        const productsUpdate = cart.productos.filter(
            (product) => product.id !== id_prod
        );

        await cartModel.updateOne(
            { _id: id_cart },
            { $set: { productos: [...productsUpdate] } }
        );
    };
}


const dbController = new ControllerMongoDb()
module.exports = dbController;