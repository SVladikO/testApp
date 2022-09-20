const db = require('../mongodb.js')


module.exports = function (app, jsonParser) {
    app.post('/users', jsonParser, create)                         // CREATE NEW USER
    app.get('/users', jsonParser, getUsers)                        // GET USERS
    app.patch('/users/:id', jsonParser, update)                    // UPDATE USER BY ID
    app.delete('/users/:id', jsonParser, remove)                   // DELETE USER BY ID
    app.get('/users/:id', jsonParser, (req, res) => res.send())    // GET USER BY ID
}

async function getUsers(req, res) {
   res.setHeader('Content-Type', 'application/json');

   db(users =>  res.send(JSON.stringify(users)), 'getUsers')
}

async function remove(req, res) {
    res.statusCode = 200
    res.send('User deleted')

    db(() => {
            console.log('Delete user by id: ', req.params.id)
            return req.params.id
        },
       'remove'
    )
}
async function create(req, res) {
    const {name, age} = req.body;

    if (!name || !age) {
        return res.send('Broken data: ' + name + ' ' + age)
    }

    db(() => {
            res.statusCode = 200
            res.send('User created')
            console.log('In create callback')
            return req.body
        },
       'create'
    )
}

async function update(req, res) {
    const {name, age} = req.body;

    res.send('Update data: ' + name + ' ' + age)
    res.statusCode = 200
    res.send('User created')
                return;
    db(() => {
            res.statusCode = 200
            res.send('User created')
            console.log('In create callback')
            return req.body
        },
       'create'
    )
}















































