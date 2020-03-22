import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import User from '../app/models/User'
import File from '../app/models/File'
import Appointment from '../app/models/Appointment'

import databaseConfig from '../config/database'

const models = [User, File, Appointment]

class Database {
    constructor() {
        this.init()
        this.mongo()
    }

    init() {
        this.connection = new Sequelize(databaseConfig)

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            "mongodb://daniel-sanchez:gobarberdaniel@cluster0-shard-00-00-6o7mm.mongodb.net:27017,cluster0-shard-00-01-6o7mm.mongodb.net:27017,cluster0-shard-00-02-6o7mm.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
            {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true}
        )
    }
}

export default new Database()