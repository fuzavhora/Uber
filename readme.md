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

## User Login Endpoint Documentation

**Endpoint: POST user/login**

### Description

Logs in an existing user. On success, returns user info and a JWT token.

### Request Data

- **email**: string (required, valid email)
- **password**: string (required)

### Responses

- **200 OK**
  - Successful login.
  - Sample Response:
    ```json
    {
      "user": {
        "email": "john.doe@example.com",
        "fullname": { "firstname": "John", "lastname": "Doe" }
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
- **401 Unauthorized**
  - Invalid email or password.
  - Sample Response:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

## User Profile Endpoint Documentation

**Endpoint: GET user/profile**

### Description

Fetches the profile of the authenticated user.

### Request Headers

- **Authorization**: Bearer token (required)

### Responses

- **200 OK**
  - Successful profile retrieval.
  - Sample Response:
    ```json
    {
      "fullname": { "firstname": "John", "lastname": "Doe" },
      "email": "john.doe@example.com"
    }
    ```
- **401 Unauthorized**
  - Missing or invalid token.
  - Sample Response:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

## User Logout Endpoint Documentation

**Endpoint: GET user/logout**

### Description

Logs out the authenticated user by clearing the token (cookie removal) and blacklisting the provided token.

### Request Headers

- **Authorization**: Bearer token (required)

### Responses

- **200 OK**
  - Successful logout.
  - Sample Response:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```
- **400 Bad Request**
  - No token found.
  - Sample Response:
    ```json
    {
      "message": "No token found"
    }
    ```
