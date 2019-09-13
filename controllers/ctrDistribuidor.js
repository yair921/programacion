const Db = require('../utility/db');
const { ObjectID } = require('mongodb');
const { errorHandler } = require('../utility/errorHandler');
const collectionName = 'distribuidor';

class CtrDistribuidor {

    static add(root, args) {
        return new Promise(async resolve => {
            let db = new Db();
            try {
                let objCnn = await db.openConnection();
                if (!objCnn.status) {
                    errorHandler({
                        method: 'CtrDistribuidor.add',
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
                            method: 'CtrDistribuidor.add',
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
                    method: 'CtrDistribuidor.add',
                    message: `Unexpected error -> ${error}`
                });
                resolve(`Error has ocurred!`);
            } finally {
                db.closeConnection();
            }
        });
    }

    static async update(root, input) {
        let db = new Db();
        try {
            let objCnn = await db.openConnection();
            if (!objCnn.status) {
                errorHandler({
                    method: 'CtrDistribuidor.update',
                    message: `Error connecting to database ${objCnn.message}`
                });
                return `Error has ocurred!`;
            }
            let collection = objCnn.db.collection(collectionName);
            let result = await collection.updateOne({ _id: ObjectID(input._id) }, { $set: { ...input.input, updated_at: new Date() } });
            if (result.matchedCount > 0) {
                result = await collection.findOne({ _id: ObjectID(input._id) });
            }
            return result;
        } catch (error) {
            errorHandler({
                method: 'CtrDistribuidor.update',
                message: `Unexpected error -> ${error}`
            });
            return `Error has ocurred!`;
        }
    }
}

module.exports = CtrDistribuidor;