import Todo from './../models/todo.js';

/**
 * Function to save new todo item
 * @param newToDo 
 * @returns newly created todo item
 */
export const save = (newToDo) => {
    const todo = new Todo(newToDo);
    return todo.save();
}

/**
 * Function to list all the todo items
 * @param query 
 * @returns list of all the todo items
 */
export const search = (query) => {
    const params = {...query};
    return Todo.find(params).exec();
}

/**
 * Function to get todo item with particular id
 * @param id 
 * @returns todo item with given id
 */
export const get = (id) => {
    const todo = Todo.findById(id).exec();
    return todo;
}

/**
 * Function to update todo item
 * @param updatedTodo 
 * @returns updated todo item
 */
export const update = (updatedTodo) => {
    const todo = Todo.findByIdAndUpdate(updatedTodo.id, updatedTodo, {new : true}).exec();
    return todo;
}

/**
 * Function to delete todo items for a given id
 * @param id 
 * @returns 
 */
export const remove = (id) => {
    const todo = Todo.findByIdAndDelete(id).exec();
    return todo
}