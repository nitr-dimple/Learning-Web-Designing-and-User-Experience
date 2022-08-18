import { request, response } from "express";
import * as contactsService from './../services/contacts-service.js';

const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}


export const post = async (request, response) => {
    try {
        const payload = request.body;
        const contact = await contactsService.save(payload);
        setSuccessResponse(contact, response);
    }catch (error) {
        setErrorResponse(error, response);
    }
    

}

export const index = async (request, response) => {
    try {
        const firstName = request.query.firstName;
        const lastName = request.query.lastName;
        const query = {};
        if(firstName) {
            query.firstName = firstName;
        }
        if(lastName) {
            query.lastName = lastName;
        }

        const contacts = await contactsService.search(query);
        setSuccessResponse(contacts, response);

    }catch (error){
        setErrorResponse(error, response);
    }
}

export const get = async(request, response) => {
    try {
        const id = request.params.id;
        const contact = await contactsService.get(id);
        setSuccessResponse(contact, response);

    }catch(error) {
        setErrorResponse(error, response);
    }
}

export const update = async(request, response) => {
    try {
        const id = request.params.id;
        const updated = {...request.body};
        updated.id = id;
        const contact = await contactsService.update(updated);
        setSuccessResponse(contact, response);


    }catch(error) {
        setErrorResponse(error, response);
    }
}

export const remove = async(request, response) => {
    try {
        const id = request.params.id;
        const contact = await contactsService.remove(id);
        setSuccessResponse({message: `Successfully Removed ${id}`}, response);

    }catch(error) {
        setErrorResponse(error, response);
    }
}