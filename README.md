# Budget_Mii

## Database Schema Design

![image](https://github.com/AlanDeleon88/budget_mii/assets/92609467/8d4b615d-d059-4c23-bdb5-d4619709ea57)

## Notes
- Budgets will organize page depending on the categories of each expense. Staple categories such as "Savings" "Bills" "Debt" Will automatically have their own place on the budget display. While misc spending will have its own category and area.

## API Documentation

## Users
### Login User
- Url : /
- Method : GET
- Request Body : none.

- Sucessfull Response:
- Status: 200

```json
    {
        "user":
        {
            "id" : 1,
            "email" : "demo@email.com",
            "firstName" : "testers",
            "lastName" : "buys",
            "username" : "coolman"
        }
    }
```

#### Error Handling
- Invalid Credentials
    - Status: 
