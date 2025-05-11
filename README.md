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
* **DATABASE\_URL**: The full connection URL for the database in the format: `postgres://USER:PASSWORD@HOST:PORT/DBNAME`.
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

Make sure to replace the placeholders (`your_username`, `your_password`, `your_gmail@example.com`, etc.) with your actual credentials.

Once you've set these environment variables, you should be able to run the application without issues.