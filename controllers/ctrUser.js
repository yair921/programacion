const { ObjectID } = require('mongodb');
const { errorHandler } = require('../utility/errorHandler');
const ctrAuth = require('./ctrAuth');
const Db = require('../utility/db');
const config = require('../config');
const Helper = require('../utility/helper');
const className = 'CtrUser';
const collectionName = 'user';

class CtrUser {

    static async getAll(global, { token }) {

        // Build object error.
        let resError = {
            ...config.messages.getFail,
            data: null
        };

        // Validation token.
        let auth = ctrAuth.validateLogin(token);
        if (!auth.status) {
            return {
                ...resError,
                message: auth.message
            };
        }

        let objPermission = auth.decode.objUserRol[0].permissions.filter(f => f.nameUserOption === collectionName)
        if (objPermission.length === 0) {
            return {
                ...resError,
                message: config.messages.unauthorized
            };
        }
        if (objPermission[0].actions.filter(f => f === 'get').length===0) {
            return {
                ...resError,
                message: config.messages.unauthorized
            };
        }

        try {
            let objResult = await Db.find({
                dbName: config.db.programacion,
                collectionName,
                params: { enabled: true }
            });
            if (!objResult.status) {
                errorHandler({
                    method: `${className}.getAll`,
                    message: `${config.messages.errorConnectionDb} -> ${objResult.message}`
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

    static async add(global, args) {
        let exist = await Helper.validateIfExist(
            {
                dbName: config.db.programacion,
                collectionName,
                params: {
                    userName: args.input.userName
                }
            });
        if (exist) {
            return {
                status: false,
                message: `The user name alredy exist!`,
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
                idUserRol: ObjectID(args.input.idUserRol),
                idTheater: ObjectID(args.input.idTheater),
                password: await Helper.encrypt(args.input.password),
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
                    message: `${config.messages.errorConnectionDb} -> ${objResult.message}`
                });
                return resError;
            }
            return {
                status: true,
                message: null,
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

    static async update(global, input) {
        try {
            if (input.input.idTeatro)
                input.input.idTeatro = ObjectID(input.input.idTeatro);
            if (input.input.idUserRol)
                input.input.idUserRol = ObjectID(input.input.idUserRol);
            if (input.input.password)
                input.input.password = await Helper.encrypt(input.input.password);
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

    static async delete(global, input) {
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

module.exports = CtrUser;