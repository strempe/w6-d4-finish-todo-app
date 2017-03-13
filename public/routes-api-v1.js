// Define a Node module that handles routing
module.exports.setup = (router, uploads, knex) => {

    // 1. Load libraries
    let moment = require('moment')

    // 2. Define routes

    // Get all todos
    router.get('/todos', function(request, response) {
// orderBy shows the items in ascening 
        knex.select().table('todos').orderBy('category', 'asc').then(function(data) {
            response.json(data)
        })

    })

    // Post a new todo
    router.post('/todos', function(request, response) {

        let now = moment().format('YYYY-MM-DD HH:mm:ss')

        let todo = {
            todos: request.body.todos.trim(),
            completed: request.body.completed ? 'yes' : 'no',
            created_at: now,
            due_date: moment(request.body.due_date).format('YYYY-MM-DD HH:mm:ss'),
            update_at: now,
            category: request.body.category,
        }

        knex.insert(todo).table('todos').returning('*').then(function(data) {
            response.json(data[0])
        })

    })
      router.get('/todos/:todoId/complete', function(request, response) {
        // Your code goes here...
        
           knex.update(todo).table('todos').where('id', '=', request.params.todoId).then(function(data) {
            response.json(true)
        })
    })

    // Return the router, with new routes attached back to the Express web server that's loading these
    return router
}