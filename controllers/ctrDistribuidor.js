const { ObjectID } = require('mongodb');
const { errorHandler } = require('../utility/errorHandler');
const Db = require('../utility/db');
const config = require('../config');
const collectionName = 'distribuidor';
const className = 'CtrDistribuidor';

class CtrDistribuidor {

    static async getAll() {
        let db = new Db();
        let objCnn = await db.openConnection();
        if (!objCnn.status) {
            errorHandler({
                method: `${className}.getAll`,
                message: `${config.messages.errorConnectionDb} -> ${objCnn.message}`
            });
            return { ...config.messages.getFail, data: [{ _id: null, nombre: null, id_filcal: null, active: null }] };
        }
        try {
            let collection = objCnn.db.collection(collectionName);
            let result = await collection.find({ enabled: true }).toArray();
            if (!result) {
                errorHandler({
                    method: `${className}.getAll`,
                    message: config.messages.errorMongoFind
                });
                return { ...config.messages.getFail, data: [{ _id: null, nombre: null, id_filcal: null, active: null }] };
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
            return { ...config.messages.errorUnexpected, data: [{ _id: null, nombre: null, id_filcal: null, active: null }] };
        } finally {
            db.closeConnection();
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
        let objCnn = await db.openConnection();
        if (!objCnn.status) {
            errorHandler({
                method: `${className}.add`,
                message: `${config.messages.errorConnectionDb} -> ${objCnn.message}`
            });
            return { ...config.messages.errorGeneric, _id: null };

        }
        try {
            let collection = objCnn.db.collection(collectionName);
            let newObj = {
                ...args.input,
                active: true,
                enabled: true,
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
            return { ...config.messages.errorUnexpected, _id: null };
        } finally {
            db.closeConnection();
        }
    }

    static async update(root, input) {
        let db = new Db();
        let objCnn = await db.openConnection();
        if (!objCnn.status) {
            errorHandler({
                method: `${className}.update`,
                message: `${config.messages.errorConnectionDb} -> ${objCnn.message}`
            });
            return config.messages.errorGeneric;
        }
        try {
            let collection = objCnn.db.collection(collectionName);
            let result = await collection.updateOne(
                { _id: ObjectID(input._id) },
                { $set: { ...input.input, updated_at: new Date() } }
            );
            if (result && result.matchedCount > 0) {
                return config.messages.updateSuccesss;
            }
            return config.messages.updateFail;
        } catch (error) {
            errorHandler({
                method: `${className}.update`,
                message: `Unexpected error -> ${error}`
            });
            return config.messages.errorUnexpected;
        } finally {
            db.closeConnection();
        }
    }

    static async delete(root, input) {
        let db = new Db();
        let objCnn = await db.openConnection();
        if (!objCnn.status) {
            errorHandler({
                method: `${className}.delete`,
                message: `${config.messages.errorConnectionDb} -> ${objCnn.message}`
            });
            return config.messages.errorGeneric;
        }
        try {
            let collection = objCnn.db.collection(collectionName);
            let result = await collection.deleteOne({ _id: ObjectID(input._id) });
            if (!result) {
                return config.messages.deleteFail;
            }
            return config.messages.deleteSuccesss;
        } catch (error) {
            errorHandler({
                method: `${className}.delete`,
                message: `Unexpected error -> ${error}`
            });
            return config.messages.errorUnexpected;
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
                message: `${config.messages.errorConnectionDb} -> ${objCnn.message}`
            });
            return config.messages.errorGeneric;
        }
        try {
            let collection = objCnn.db.collection(collectionName);
            let result = await collection.findOne({ ...params, enabled: true });
            if (result)
                return true
            else
                return false
        } catch (error) {
            errorHandler({
                method: `${className}.validateIfExist`,
                message: `${config.messages.errorConnectionDb} -> ${objCnn.message}`
            });
            return config.messages.errorUnexpected;
        } finally {
            db.closeConnection();
        }
    }
}

module.exports = CtrDistribuidor;