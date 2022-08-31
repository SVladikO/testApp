const mongodb = require('mongodb')
const ObjectID = mongodb.ObjectID
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'user-manager'

module.exports = function (callback, action) {
    MongoClient.connect(
        connectionURL,
        {useNewUrlParser: true},
        (error, client) => {
            if (error) {
                return console.log('Unable to connect to db')
            }

            const db = client.db(databaseName)
            const collection = db.collection('users')

            function errorHandler(error, result) {
                if (error) {
                    return console.log('Unable to insert user')
                }

                console.log(result.ops);
            }

            switch (action) {
                case 'getUsers':
                    const col = collection.find({})
                        col
                            .toArray()
                            .then(data => {
                                console.log(data.length)
                                callback(data)
                                client.close()
                            });
                    break;
                case 'create':
                    collection.insertOne(callback(), errorHandler)
                    break;

                case 'update':
                    collection.insertOne(callback(), errorHandler)
                    break;
                case 'remove':
                    collection.deleteOne({_id: ObjectID(callback())})
                    break;
                default: {
                    console.log('No case for ', action)
                    client.close()
                }
            }
//        db.collection('users').insertOne({
//            name: 'Ira',
//            age: 36
//        }, (error, result) => {
//            if (error) {
//                return console.log('Unable to insert user')
//            }
//
//            console.log(result.ops);
//        })

        console.log('Connected correctly!', action)
        console.log('Connection closed!')
})
}
