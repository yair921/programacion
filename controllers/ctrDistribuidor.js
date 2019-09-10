const mongodb = require('mongodb');

class CtrDistribuidor {

    static agregarDistribuidor(root, args) {
        return new Promise(resolve => {
            resolve({
                nombre: args.input.nombre
            });
        });
    }
}

module.exports = CtrDistribuidor;