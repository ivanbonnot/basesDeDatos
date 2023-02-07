const chatModel = require('../models/chatModel')
const normalizedData = require('../normalizer/normalizr')

class ControllerMongoDB {



  async getAll() {

    const array = {
      id: "123",
      mensajes: [],
    };

    const mensajes = await chatModel.find({})
    mensajes.forEach((mensaje) => {
      array.mensajes.push(mensaje)
    })
    return array;
  }


  async saveChat(mensaje) {
    try {
      const chat = new chatModel(mensaje);
      await chat.save();
      console.log("guardado", chat)
      return
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }
}


const chatsController = new ControllerMongoDB()


module.exports = chatsController