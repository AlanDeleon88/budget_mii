# Budget_Mii

## Database Schema Design

![image](https://github.com/AlanDeleon88/budget_mii/assets/92609467/8d4b615d-d059-4c23-bdb5-d4619709ea57)

## Notes
- Budgets will organize page depending on the categories of each expense. Staple categories such as "Savings" "Bills" "Debt" Will automatically have their own place on the budget display. While misc spending will have its own category and area.

## API Documentation

## Session Routes
### Login User
- Url: /api/session
- Method: GET
- Request Body: none.

#### Sucessfull Response:
    - Status: 200

```json
    {
        "user":
        {
            "id": 1,
            "email": "demo@email.com",
            "firstName": "testers",
            "lastName": "buys",
            "username": "coolman"
        }
    }
```

#### Error Handling
- Invalid Credentials, password or email incorrect
    - Status: 401
    - Error response:
    ```json
        {
            "title": "login failed",
            "errors": {
                            "credential": "The provided credentials were invalid"
                        }
        }
    ```
- Missing password / credential fields
    - Status: 400
    - Error Response:
    ```json
        {
            "title": "Bad request.",
            "errors": {
                "credential": "Please provide a valid email or username",
                "password": "Please provide a password"
            }

        }

    ```

### Logout User
- Url: /api/session
- Method: DELETE
- Request Body: none

#### Successfull Response:
    - Status: 200

```json
    {
        "message": "logout successful"
    }
```

### Restore User
- Url: /api/session
- Method: GET
- Request Body: none

- Successfull Response:
    - Status: 200
```json
        {
            "user":{
                "id": 1,
                "email": "email@email.com",
                "firstName": "guyman",
                "lastName": "lastname"
            }
        }
```

## User Routes
### Sign up a user
- url: /api/users
- Method: POST
- Request Body:
```json
    {
        "firstName": "testName",
        "lastName": "lastTest",
        "username": "coolUser",
        "email": "email@email.com",
        "password": "password"
    }
```
#### Sucessfull Response:
    - Status: 201

```json
    {
        "user":
        {
            "id": 1,
            "email": "demo@email.com",
            "firstName": "testers",
            "lastName": "buys",
            "username": "coolman"
        }
    }
```

#### Error Handling

- Missing fields, body validations
    - Status: 400
    - Error Response:
    ```json
        {
            "title": "Bad request.",
            "errors": {
                "firstName": "Please provide a first name with at least 2 characters",
                "lastName": "Please provide a last name with at least 2 characters",
                "username": "Please provide a username with at least 4 characters.",
                "username": "Username cannot be an email.",
                "email": "Please provide a valid email'",
                "password": "Password must be 6 characters or more"
            }

        }

    ```

### Get all budgets from a user
- Url: /api/users/:userId/budgets
- Method: GET
- Request Body: none

#### Successful Response:
    - Status: 200
```json
    {
        [
            {
                "id": 1,
                "userId": 1,
                "budget": 1300,
                "start": "09-1-24",
                "end" : "09-15-24"
            },
                        {
                "id": 2,
                "userId": 3,
                "budget": 1400,
                "start": "09-4-24",
                "end" : "09-30-24"
            },

        ]
    }
```

#### Error Handling:
- Cannot find user with that id
- status 404
```json
 {
    "title": "Cannot find user",
    "message": "Cannot find a user with that id"
 }
```


### Get all accounts from a user
- Url: /api/users/:id/accounts
- Method: GET
- Request Body: none

#### Successful response:
- statuse 200

```json
    {
        "id": 1,
        "userId": 1,
        "type": "Checking",
        "balance": 1400
    }
```

#### Error Handling:
- Cannot find user with that id
- status 404
```json
 {
    "title": "Cannot find user",
    "message": "Cannot find a user with that id"
 }
```

## Budget routes

### Get budget details
- Url: /api/budgets/:id
- Method: GET
- Request body: none
#### Successful Response
- Status: 200
- Response body:
```json
    {
        "id": 1,
        "budgetId": 2,
        "accountId": 1,
        "categoryId": 1,
        "budget": 1300,
        "actual": 0,
        "expenses" :[
            {
                "id" : 1,
                "accountId" : 1,
                "categoryId" : 1,
            }
        ],
        "categories" : [
            {
                "id" : 1,
                "budgetId" : 1,
            }
        ]
    }
```

#### Error Handling:
- Cannot find budget with that id
- status 404
```json
 {
    "title": "Cannot find budget",
    "message": "Cannot find an budget with that id"
 }
```

### Get all Expenses from a budget
- Url: /api/budgets/:id/expenses
- Method: GET
- Request body: none

#### Successful Response
- Status: 200
- Response body:
```json
    { "expenses" : [
        {
            "id": 1,
            "budgetId" : 1,
            "accountId" : 1,
            "categoryId" : 1,
            "amount" : 200,
            "date" : "9-24-24",
        }

        ]
    }

```

#### Error Handling:
- Cannot find budget with that id
- status 404
```json
 {
    "title": "Cannot find budget",
    "message": "Cannot find an expense with that id"
 }
```


### Add new budget
- Url: /api/budgets
- Method: POST
- Request Body:
```json
    {
        "budget": 1000,
        "start": "9-10-24",
        "end": "9-25-24"
    }

```

#### Successful Response
- status: 201
- Response Body:
    ```json
        {
            "id": 3,
            "userId": 2,
            "budget": 1000,
            "start": "9-10-24",
            "end": "9-25-224"
        }
    ```

#### Error Handling:
- Body Validation
- status 404
```json
 {
    "title": "Bad Request",
    "errors": {
        "budget": "Invalid budget, must be a number above 0",
        "end": "End date must be after start Date"
    }
 }
```

### Edit a Budget
- Url: /api/budgets/:budgetId
- Method: PUT / PATCH
- Request Body:
```json
    {
        "budget": 1500,
        "start": "9-11-24",
        "end": "9-27-24"
    }
```

#### Successful Response
- status: 201
- Response Body:
    ```json
        {
            "id": 3,
            "userId": 2,
            "budget": 1500,
            "start": "9-11-24",
            "end": "9-27-224"
        }
    ```

#### Error Handling:
- Body Validation
- status 401
```json
 {
    "title": "Bad Request",
    "errors": {
        "budget": "Invalid budget, must be a number above 0",
        "end": "End date must be after start Date"
    }
 }
```

### Delete a Budget
- Url: /api/budgets/:budgetId
- Method: DELETE
- Request Body: none

#### Successful Response
- status: 200
- Response Body:
    ```json
        {
            "message": "Successfully deleted"
        }
    ```
#### Error Handling:
- Could not find budget with that Id
- status 404
```json
 {
    "title": "Could not find budget",
    "message": "Could not find a budget with that id"
 }
```

## Accounts Routes

### Get details of an account by id
- Url: /api/accounts/:accountId
- Method: GET
- Request Body: none

#### Successful Response
- status: 201
- Response Body:
    ```json
        {
            "id": 3,
            "userId": 2,
            "type": "Checking",
            "balance": 2000
        }
    ```
#### Error Handling:
- Could not find account with that Id
- status 404
```json
 {
    "title": "Could not find account",
    "message": "Could not find a account with that id"
 }
```

### Create a new Account balance
- Url: /api/accounts/:accountId
- Method: POST
- Request Body:
```json
    {
        "type": "checking",
        "balance": 4000,
    }
```

#### Successful Response
- status: 201
- Response Body:
    ```json
        {
            "id": 3,
            "userId": 2,
            "type": "Checking",
            "balance": 4000
        }
    ```
#### Error Handling:
- Body Validation
- status 401
```json
 {
    "title": "Bad Request",
    "errors": {
        "type": "You must enter an account type",
        "balance": "Balance cannot be empty"
    }
 }
```

### Edit an account
- Url: /api/accounts/:accountId
- Method: PUT / PATCH
- Request Body:
```json
    {
        "balance": 300
    }
```

#### Successful Response
- status: 201
- Response Body:
    ```json
        {
            "id": 3,
            "userId": 2,
            "type": "Checking",
            "balance": 300
        }
    ```
#### Error Handling:
- Body Validation
- status 401
```json
 {
    "title": "Bad Request",
    "errors": {
        "balance": "Balance cannot be empty and must be a number"
    }
 }
```

### Delete an account
- Url: /api/accounts/:accountId
- Method: DELETE
- Request body: none

#### Successful Response
- Status: 200
- Response Body:
```json
    {
        "message": "Successfully deleted"
    }
```


## Expenses Routes

### Get details for an expense by id

### Update an expense

### Delete an expense


## Categories Routes
