import { compare, hash } from "bcryptjs";
import { ServerError } from "../errors/error-classes/server-error";
import { UserModel } from "../models/user-model";
import type { LoginCreds, SignupCreds } from "../v-schemas/credentials-schema";
import { CONFIG } from "../config";
import { isInDevelopmentMode } from "../libs/utils";
import {
    createExpiry, 
    createIssueAt, 
    DirtyJwtSignature, 
    ExpiredJwt, 
    InvalidJwt, 
    signJwt, 
    verifyJwt
} from "@d3vtool/kazejs/jwt";


export class IdentityService {
    static #JWT_SEC = CONFIG.JWT_SEC;

    public static async create(
        creds: SignupCreds
    ) {
        try {
            const info = await this.userExists(creds.email);
            
            if(Object.keys(info).length > 0) {
                throw new ServerError(
                    `User having email '${creds.email}' already registered.`,
                    409
                );
            }
        } catch(err: unknown) {
            if(err instanceof ServerError && err.statusCode !== 404)
                throw err;
        }


        creds.password = await this.hashPassword(creds.password);

        await UserModel.createUser(creds);
    }

    public static async userExists(
        email: SignupCreds["email"]
    ) {
        return await UserModel.fetchColsByEmail(email, ["userId", "email"]);
    }

    static async authenticateUser(
        loginCreds: LoginCreds
    ) {
        const result = await UserModel.fetchColsByEmail(
            loginCreds.email,
            ["userId", "password"]
        );

        const isOkay = await compare(loginCreds.password, result.password);

        if(!isOkay) {
            throw new ServerError(
                "Invalid login credentials.",
                401
            );
        }

        return result;
    }

    private static async hashPassword(
        password: string
    ) {
        const hashedPassword = await hash(password, 10);

        return hashedPassword;
    }

    static async generateJwtFor(
        audience: string,
        subject: string,
        customClaims: Record<string, string>
    ) {

        const token = await signJwt(
            {
                aud: audience,
                iss: CONFIG.URL,
                exp: createExpiry("1h"),
                sub: subject,
                iat: createIssueAt(new Date(Date.now())),
            },
            customClaims,
            this.#JWT_SEC
        );

        return token;
    }


    static async verifyJwt<T extends Record<string, string> & Object>(
        token: string
    ) {
        try {
            return await verifyJwt<T>(token, this.#JWT_SEC);
        } catch(error: unknown) {

            switch(true) {
                case (error instanceof DirtyJwtSignature):
                    throw new ServerError(
                        "JWT signature is invalid or has been tampered with.",
                        400
                    );
                case (error instanceof ExpiredJwt):
                    throw new ServerError(
                        "JWT has expired.",
                        401
                    );
                case (error instanceof InvalidJwt):
                    throw new ServerError(
                        "JWT is malformed or cannot be decoded.",
                        400
                    );
                default:
                    throw new ServerError(
                        `${isInDevelopmentMode() ? error : "Error occured while verifying jwt token."}`,
                        500
                    );
            }
        }
    }
}