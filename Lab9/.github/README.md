#Contacts API

APIS available in this service.


```
// Retrieve all contacts.
GET /contacts

// Create new contact
POST /contacts

// Retrieve a single contact by id
GET /contacts/:id

// Update a single contact by id
PUT /contacts/:id


// Remove a single contact by id
DELETE /contacts/:id
```

Tools used 
1. `expressjs`
2. `mongoosjs`

Steps
1. npm init
2. npm i --save express mongoose cors debug
3. add  "type": "module",  to package.json file
4. 