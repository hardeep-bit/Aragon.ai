
const api = global.app.appRouter;

api.model('tasks')
    .register([{
        action: 'POST',
        method: 'createTask',
        url: '/',
    }, {
        action: 'GET',
        method: 'getTask',
        url: '/:taskId',
    }, {
        action: 'GET',
        method: 'getTaskByBoardId',
        url: '/board/:boardId',
    }, {
        action: 'DELETE',
        method: 'deleteTask',
        url: '/:taskId',
    }, {
        action: 'PUT',
        method: 'updateTask',
        url: '/:taskId/board/:boardId',
    }]);