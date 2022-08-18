import todoRouter from './todo-router.js';

// exporting all apis
export default (app) => {
    app.use('/', todoRouter);
}