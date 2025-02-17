# User Registration Endpoint Documentation

## Endpoint: POST

`user/register`

### Description

Registers a new user. On success, returns user info and a JWT token.

### Request Data

- **fullname**: An object containing:
  - **firstname**: string (required, minimum 3 characters)
  - **lastname**: string (optional)
- **email**: string (required, valid email)
- **password**: string (required, minimum 6 characters)

### Responses

- **201 Created**
  - Successful registration.
  - Sample Response:
    ```json
    {
      "user": {
        "fullname": { "firstname": "John", "lastname": "Doe" },
        "email": "john.doe@example.com"
      },
      "token": "JWT_TOKEN"
    }
    ```
- **400 Bad Request**
  - Validation errors.
  - Sample Response:
    ```json
    {
      "errors": [
        { "msg": "Error message", "param": "field", "location": "body" }
      ]
    }
    ```
