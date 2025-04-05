
const api = global.app.appRouter;

api.model('boards')
    .register([{
        action: 'POST',
        method: 'createBoard',
        url: '/',
    }, {
        action: 'GET',
        method: 'getBoard',
        url: '/:boardId',
    }, {
        action: 'GET',
        method: 'getBoards',
        url: '/',
    }, {
        action: 'DELETE',
        method: 'deleteBoard',
        url: '/:boardId',
    }, {
        action: 'PUT',
        method: 'updateBoard',
        url: '/:boardId',
    }]);