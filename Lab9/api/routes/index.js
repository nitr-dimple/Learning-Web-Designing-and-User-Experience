import contactsRouter from './contacts-router.js';

export default (app) => {
    app.use('/', contactsRouter);
}