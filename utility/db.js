require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = process.env.DB_HOST;

class Db {

    set database(value) {
        this.databaseValue = value;
    }
    get database() {
        return this.databaseValue;
    }

    set client(value) {
        this.clientValue = value;
    }

    get client() {
        return this.clientValue;
    }

    constructor() {
        this.database = process.env.DB_NAME;
    }

    openConnection() {
        return new Promise(resolve => {
            MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
                assert.equal(null, error);
                if (error) {
                    resolve({
                        status: false,
                        message: error
                    });
                    return;
                }
                this.client = client;
                let db = client.db(this.database);
                resolve({
                    status: true,
                    db
                });
            });
        });
    }

    closeConnection() {
        this.client.close();
        console.log('Connection was closed!');
    }

}

module.exports = Db;