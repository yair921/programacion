const Db = require('../utility/db');
const { ObjectID } = require('mongodb');
const { errorHandler } = require('../utility/errorHandler');
const database = 'programacion';
const collectionName = 'distribuidores';

class CtrDistribuidor {

    static agregarDistribuidor(root, args) {
        return new Promise(async resolve => {
            let db = new Db(database);
            try {
                let objCnn = await db.openConnection();
                if (!objCnn.status) {
                    errorHandler({
                        method: 'CtrDistribuidor.agregarDistribuidor',
                        message: `Error connecting to database ${objCnn.message}`
                    });
                    resolve(`Error has ocurred!`);
                    return;
                }
                let collection = objCnn.db.collection(collectionName);
                let newObj = {
                    nombre: args.input.nombre,
                    id_fiscal: args.input.id_fiscal,
                    create_at: new Date(),
                    updated_at: new Date()
                }
                collection.insertOne(newObj, (err, result) => {
                    if (err) {
                        errorHandler({
                            method: 'CtrDistribuidor.agregarDistribuidor',
                            message: `Error executing query ${err}`
                        });
                        resolve(`Error has ocurred!`);
                        return;
                    }
                    resolve({
                        _id: ObjectID(result.insertedId),
                        nombre: args.input.nombre,
                        id_fiscal: args.input.id_fiscal
                    });
                });
            } catch (error) {
                errorHandler({
                    method: 'CtrDistribuidor.agregarDistribuidor',
                    message: `Unexpected error -> ${error}`
                });
                resolve(`Error has ocurred!`);
            } finally {
                db.closeConnection();
            }
        });
        // return new Promise(resolve => {
        //     resolve({
        //         nombre: args.input.nombre
        //     });
        // });
    }
}

module.exports = CtrDistribuidor;