import express from "express";
import * as todoController from './../controllers/todo-controller.js';

const router = express.Router();

// Apis for /todos
router.route('/todos')
    .post(todoController.post)
    .get(todoController.index);

// Apis fro /todos/"id" 
router.route('/todos/:id')
    .get(todoController.get)
    .put(todoController.update)
    .delete(todoController.remove);

export default router;