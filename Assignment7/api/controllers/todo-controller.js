import { response } from 'express';
import * as todoService from './../services/todo-service.js';

const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

/**
 * Post request for creating todo list
 * @param request 
 * @param response 
 */
export const post = async (request , response) => {
    try {
        const payload = request.body;
        const todo = await todoService.save(payload);
        setSuccessResponse(todo, response);
    }catch (error) {
        setErrorResponse(error, response);
    }
}

/**
 * get request for listing all todo items
 * @param request 
 * @param response 
 */
export const index = async (request, response) => {
    try {
        const query = {};
        const todo = await todoService.search(query);
        setSuccessResponse(todo, response);

    }catch (error){
        setErrorResponse(error, response);
    }
}

/**
 * Function to get todo item with particular id
 * @param request 
 * @param response 
 */
export const get = async(request, response) => {
    try {
        const id = request.params.id;
        const todo = await todoService.get(id);
        setSuccessResponse(todo, response);

    }catch(error) {
        setErrorResponse(error, response);
    }
}

/**
 * Function to update todo item
 * @param request 
 * @param response 
 */
export const update = async(request, response) => {
    try {
        const id = request.params.id;
        const updated = {...request.body};
        updated.id = id;
        const todo = await todoService.update(updated);
        setSuccessResponse(todo, response);
    }catch(error) {
        setErrorResponse(error, response);
    }
}


/**
 * Function to delete todo item
 * @param request 
 * @param response 
 */
export const remove = async(request, response) => {
    try {
        const id = request.params.id;
        const todo = await todoService.remove(id);
        setSuccessResponse({message: `Successfully Removed ${id}`}, response);

    }catch(error) {
        setErrorResponse(error, response);
    }
}