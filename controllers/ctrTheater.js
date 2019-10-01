const { errorHandler } = require('../utility/errorHandler');
const Db = require('../utility/db');
const config = require('../config');
const Helper = require('../utility/helper');
const className = 'CtrTheater';
const collectionName = 'theater';

class CtrTheater {

    static async getAll() {
        let resError = {
            ...config.messages.getFail,
            data: [
                {
                    _id: null,
                    nombre: null,
                    active: null
                }
            ]
        };
        try {
            let objResult = await Db.find({
                dbName: config.db.programacion,
                collectionName,
                params: { enabled: true }
            });
            if (!objResult.status) {
                errorHandler({
                    method: `${className}.getAll`,
                    message: `${config.messages.errorConnectionDb} -> ${objCnn.message}`
                });
                return resError
            }
            return {
                status: true,
                message: null,
                data: objResult.result
            };
        } catch (error) {
            errorHandler({
                method: `${className}.add`,
                message: `Unexpected error -> ${error}`
            });
            return resError;
        }
    }

    static async add(root, args) {
        let exist = await Helper.validateIfExist(
            {
                dbName: config.db.programacion,
                collectionName,
                params: { nombre: args.input.nombre }
            });
        if (exist) {
            return {
                status: false,
                message: `El teatro ya existe en la base de datos`,
                _id: null
            };
        }
        let resError = {
            ...config.messages.addFail,
            _id: null
        };
        try {
            let newObj = {
                ...args.input,
                active: true,
                enabled: true,
                create_at: new Date(),
                updated_at: new Date()
            };
            let objResult = await Db.insertOne({
                dbName: config.db.programacion,
                collectionName,
                params: newObj
            });
            if (!objResult.status) {
                errorHandler({
                    method: `${className}.add`,
                    message: `${config.messages.errorConnectionDb} -> ${objCnn.message}`
                });
                return resError;
            }
            return {
                status: true,
                message: config.messages.addSuccesss,
                _id: objResult._id
            }
        } catch (error) {
            errorHandler({
                method: `${className}.add`,
                message: `Unexpected error -> ${error}`
            });
            return { ...config.messages.errorUnexpected, _id: null };
        }
    }

    static async update(root, input) {
        try {
            let objResult = await Db.update({
                dbName: config.db.programacion,
                collectionName,
                _id: input._id,
                set: { ...input.input, updated_at: new Date() }
            });
            if (!objResult.status) {
                errorHandler({
                    method: `${className}.update`,
                    message: `${config.messages.errorConnectionDb} -> ${objResult.message}`
                });
                return config.messages.updateFail;
            }
            if (objResult.result && objResult.result.matchedCount > 0) {
                return config.messages.updateSuccesss;
            }
            return config.messages.updateFail;
        } catch (error) {
            errorHandler({
                method: `${className}.update`,
                message: `Unexpected error -> ${error}`
            });
            return config.messages.errorUnexpected;
        }
    }

    static async delete(root, input) {
        try {
            let objResult = await Db.delete({
                dbName: config.db.programacion,
                collectionName,
                _id: input._id
            });
            if (!objResult.status) {
                errorHandler({
                    method: `${className}.delete`,
                    message: `${config.messages.errorConnectionDb} -> ${objResult.message}`
                });
                return config.messages.deleteFail;
            }
            return config.messages.deleteSuccesss;
        } catch (error) {
            errorHandler({
                method: `${className}.delete`,
                message: `Unexpected error -> ${error}`
            });
            return config.messages.errorUnexpected;
        }
    }
}

module.exports = CtrTheater;