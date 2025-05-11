import { makeReadOnly } from "../libs/utils";

export const CONFIG = makeReadOnly({
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL: process.env.DATABASE_URL!,
    PROTOCOL: "http",
    get DOMAIN () {
        return `localhost:${this.PORT}`;
    },
    get URL () {
        return `${this.PROTOCOL}://${this.DOMAIN}`;
    },
    JWT_SEC: process.env.JWT_SEC!
});

export const MAIL = makeReadOnly({
    user: process.env.EMAIL_ID!,
    pass: process.env.EMAIL_APP_ID!
});