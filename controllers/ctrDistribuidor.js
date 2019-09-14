const Db = require('../utility/db');
const { ObjectID } = require('mongodb');
const { errorHandler } = require('../utility/errorHandler');
const collectionName = 'distribuidor';
const className = 'CtrDistribuidor';

class CtrDistribuidor {

    static async getAll() {
        let db = new Db();
        try {
            let objCnn = await db.openConnection();
            if (!objCnn.status) {
                errorHandler({
                    method: `${className}.getAll`,
                    message: `Error connecting to database ${objCnn.message}`
                });
            }
            let collection = objCnn.db.collection(collectionName);
            let result = await collection.find({}).toArray();
            if (!result) {
                errorHandler({
                    method: `${className}.getAll`,
                    message: `Error to execute find method of mongodb.`
                });
            }
            return {
                status: true,
                message: null,
                data: result
            }
        } catch (error) {
            errorHandler({
                method: `${className}.add`,
                message: `Unexpected error -> ${error}`
            });
        }
    }

    static async add(root, args) {
        let exist = await CtrDistribuidor.validateIfExist({ id_fiscal: args.input.id_fiscal });
        if (exist) {
            return {
                status: false,
                message: `El nit ya existe enla base de datos!`,
                _id: null
            };
        }
        let db = new Db();
        try {
            let objCnn = await db.openConnection();
            if (!objCnn.status) {
                errorHandler({
                    method: `${className}.add`,
                    message: `Error connecting to database ${objCnn.message}`
                });
            }
            let collection = objCnn.db.collection(collectionName);
            let newObj = {
                nombre: args.input.nombre,
                id_fiscal: args.input.id_fiscal,
                create_at: new Date(),
                updated_at: new Date()
            }
            let result = await collection.insertOne(newObj);
            if (result) {
                return {
                    status: true,
                    message: null,
                    _id: ObjectID(result.insertedId)
                }

            }
        } catch (error) {
            errorHandler({
                method: `${className}.add`,
                message: `Unexpected error -> ${error}`
            });
        } finally {
            db.closeConnection();
        }
    }

    static async update(root, input) {
        let db = new Db();
        try {
            let objCnn = await db.openConnection();
            if (!objCnn.status) {
                errorHandler({
                    method: `${className}.update`,
                    message: `Error connecting to database ${objCnn.message}`
                });
            }
            let collection = objCnn.db.collection(collectionName);
            let result = await collection.updateOne(
                { _id: ObjectID(input._id) },
                { $set: { ...input.input, updated_at: new Date() } }
            );
            if (result && result.matchedCount > 0) {
                return {
                    status: true,
                    message: `Distribuidor actualizado de forma exitosa!`
                };
            }
            return {
                status: false,
                message: `No ha sido posible actualizar el distribuidor.`
            };
        } catch (error) {
            errorHandler({
                method: `${className}.update`,
                message: `Unexpected error -> ${error}`
            });
        } finally {
            db.closeConnection();
        }
    }

    static async delete(root, input) {
        let db = new Db();
        try {
            let objCnn = await db.openConnection();
            if (!objCnn.status) {
                errorHandler({
                    method: `${className}.delete`,
                    message: `Error connecting to database ${objCnn.message}`
                });
            }
            let collection = objCnn.db.collection(collectionName);
            let result = await collection.deleteOne({ _id: ObjectID(input._id) });
            if (!result) {
                return {
                    status: false,
                    message: `No ha sido posible eliminar el distribuidor!`,
                };
            }
            return {
                status: true,
                message: `El distribuidor ha sido borrado!`
            };
        } catch (error) {
            errorHandler({
                method: `${className}.delete`,
                message: `Unexpected error -> ${error}`
            });
        } finally {
            db.closeConnection();
        }
    }

    static async validateIfExist(params) {
        let db = new Db();
        let objCnn = await db.openConnection();
        if (!objCnn.status) {
            errorHandler({
                method: `${className}.validateIfExist`,
                message: `Error connecting to database ${objCnn.message}`
            });
        }
        let collection = objCnn.db.collection(collectionName);
        try {
            let result = await collection.findOne(params);
            if (result)
                return true
            else
                return false
        } catch (error) {
            errorHandler({
                method: `${className}.validateIfExist`,
                message: `Error connecting to database ${objCnn.message}`
            });
        }
    }
}

module.exports = CtrDistribuidor;