# simple-mail

## 🚀 Clone the Repository

To clone the repository to your local machine, run:

```bash
git clone https://github.com/ks961/simple-mail.git
```

Change direcotory to 'simple-mail':

```bash
cd simple-mail
```

## 📦 Install Dependencies

To install the required dependencies for the project, run:

```bash
bun install
````

## 🚀 Run the App

To start the application, run:

```bash
bun start
```

## 🛠️ Setup Database

1. **Login to your PostgreSQL RDBMS.**

2. **Create a database named `db_simple_mail`:**

```bash
createdb -U your_username db_simple_mail
```

3. **Import the schema (no data):**

```bash
psql -U your_username -d db_simple_mail -f db_simple_mail.sql
```

> ⚠️ Make sure `db_simple_mail.sql` exists and contains the schema you want to import.

## ⚙️ Environment Variables

The following environment variables must be set for the application to run properly:

### Required Environment Variables

* **PORT**: Port on which the server will run.
* **NODE\_ENV**: Set this to `development` or `production` depending on the environment.
* **POSTGRES\_USER**: PostgreSQL username.
* **POSTGRES\_HOST**: Host for the PostgreSQL database (typically `localhost` or a remote server).
* **POSTGRES\_PASS**: Password for the PostgreSQL user.
* **POSTGRES\_DB**: Name of the PostgreSQL database to connect to.
* **DATABASE\_URL**: "postgres://${POSTGRES_USER}:${POSTGRES_PASS}@localhost/${POSTGRES_DB}"
* **JWT\_SEC**: Secret key used for signing JWT tokens.
* **EMAIL\_ID**: Your email address to be used for sending emails.
* **EMAIL\_APP\_ID**: App-specific identifier for the email service (e.g., Mailgun or SendGrid).

### Example `.env` file:

```env
PORT=3000
NODE_ENV=development

POSTGRES_USER=your_username
POSTGRES_HOST=localhost
POSTGRES_PASS=your_password
POSTGRES_DB=db_simple_mail

DATABASE_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASS}@localhost/${POSTGRES_DB}"

JWT_SEC=your_jwt_secret_key

EMAIL_ID=your_gmail@example.com
EMAIL_APP_ID=your_gmail_app_id
```

Make sure to replace the placeholders (`your_username`, `your_password`, `your_gmail@example.com`, etc.) with your actual credentials.

Once you've set these environment variables, you should be able to run the application without issues.

---

### API Endpoints

#### **POST /users/signup**

**Description:**
Registers a new user by validating the provided details and handling any signup-related errors.

**Route:**
`UserController.signup`

**Request Body:**

* The request body is validated using the `signupValidator`. It should include the following fields:

  * `email` (required): The email address of the user. Must be a valid email format.
  * `password` (required): The password for the account. Must meet password validation requirements.

**Request Body Validation (via `signupValidator`):**

* The `signupValidator` uses the `credsSchema`, which validates:

  * `email`: Must be a valid email address (`Validator.string().email()`).
  * `password`: Must be a valid password string (`Validator.string().password()`), where the specific password rules would be defined in the `Validator.string().password()` method (e.g., length, complexity).

**Response Statuses:**

* `201 Created`: User successfully registered.
* `400 Bad Request`: Request body fails validation (e.g., invalid email or password format).
* `409 Conflict`: Email already exists in the system.
* `500 Internal Server Error`: Unexpected error during user registration.

**Middleware:**

* `jsonValidate(signupValidator)`: Validates the request body using the `signupValidator`, ensuring that the `email` is a valid email address and the `password` meets the required format before proceeding to the controller.

**Error Handler:**

* `signupHandler`: Custom error handler that manages signup-related failures, such as invalid data or conflict errors like an already registered email.

**Controller:**

* `UserController.signup`: Handles the user registration logic, including validating the request body and managing the creation of a new user.

---

#### **POST /users/login**

**Description:**
Logs in an existing user by validating the provided login details and handling any login-related errors.

**Route:**
`UserController.login`

**Request Body:**

* The request body is validated using the `loginValidator`. It should include the following fields:

  * `email` (required): The email address of the user. Must be a valid email format.
  * `password` (required): The password for the account.

**Request Body Validation (via `loginValidator`):**

* The `loginValidator` uses the same schema as the signup validator (`credsSchema`), which validates:

  * `email`: Must be a valid email address (`Validator.string().email()`).
  * `password`: Must be a valid password string (`Validator.string().password()`), meeting the password format rules defined in `Validator.string().password()`.

**Response Statuses:**

* `200 OK`: Login successful, and an authentication token is returned.
* `400 Bad Request`: Request body fails validation (e.g., invalid email or password format).
* `401 Unauthorized`: Invalid email or password combination.
* `500 Internal Server Error`: Unexpected error during login.

**Middleware:**

* `jsonValidate(loginValidator)`: Validates the request body using the `loginValidator`, ensuring that the `email` is in a valid format and the `password` meets the necessary criteria.

**Error Handler:**

* `loginHandler`: Custom error handler that manages login-related failures, such as invalid credentials or server errors.

**Controller:**

* `UserController.login`: Handles the user login logic, including validating the credentials and generating an authentication token if the login is successful.

---

Thanks for the additional details! Here’s the API documentation for the `/mail` endpoint based on the provided controller and the `mailValidator` schema:

---

#### **POST /mail**

**Description:**
Sends an email by validating the provided email details and handling any email-related errors.

**Route:**
`MailController.mail`

**Request Body:**

* The request body is validated using the `mailValidator`. It should include the following fields:

  * `from` (required): The sender’s Name. Must be a string with a minimum length of 5 characters.
  * `toMail` (required): The recipient's email address. Must be a valid email format.
  * `subject` (required): The subject of the email. Must be a string with a minimum length of 10 characters.
  * `body` (required): The body content of the email. Must be a string with a minimum length of 10 characters.

**Request Body Validation (via `mailValidator`):**

* The `mailValidator` uses the `mailSchema`, which validates:

  * `from`: The sender's email must be a string with at least 5 characters (`Validator.string().minLength(5)`).
  * `toMail`: The recipient's email must be a valid email format (`Validator.string().email()`).
  * `subject`: The subject of the email must be a string with at least 10 characters (`Validator.string().minLength(10)`).
  * `body`: The body content of the email must be a string with at least 10 characters (`Validator.string().minLength(10)`).

**Response Statuses:**

* `200 OK`: The email was sent successfully.
* `400 Bad Request`: Request body fails validation (e.g., missing or invalid fields like `from`, `toMail`, `subject`, or `body`).
* `500 Internal Server Error`: Unexpected error while processing or sending the email.

**Middleware:**

* `jsonValidate(mailValidator)`: Validates the request body using the `mailValidator`, ensuring that all fields (`from`, `toMail`, `subject`, `body`) are properly formatted and meet the required length constraints.

**Error Handler:**

* `mailErrorHandler`: Custom error handler that manages email-related failures, such as invalid email data or issues during email sending.

**Controller:**

* `MailController.mail`: Handles the email sending logic, including validating the request body and performing the necessary actions to send the email.
````