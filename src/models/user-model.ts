import { eq } from "drizzle-orm";
import { db } from "../db";
import { users, type TUser } from "../db/schema";
import { ServerError } from "../errors/error-classes/server-error";
import type { SignupCreds } from "../v-schemas/credentials-schema";


export class UserModel {


    static async createUser(
        user: SignupCreds
    ) {
        try {
            
            await db.insert(users).values({
                email: user.email,
                password: user.password
            });

        } catch(err) {
            throw new ServerError(
                "Something went wrong, Please try after sometime.",
                500
            );
        }
    }

    static async fetchColsByCol<K extends keyof TUser>(
        colName: K,
        colValue: TUser[K],
        colsToFetch: (keyof TUser)[]
    ) {
        try {
            const fetchObj = colsToFetch.reduce((acc, col) => {
                acc[col] = users[col as keyof TUser];
    
                return acc;
            }, {} as Record<string, any>);
    
            const result = await db.select(fetchObj).from(users).where(eq(users[colName], colValue));

            return result[0];
        } catch(err: unknown) {

            throw new ServerError(
                "Something went wrong, Please try after sometime.",
                500
            );
        }
    }

    static async fetchColsByEmail<K extends keyof TUser>(
        email: TUser["email"],
        colsToFetch: K[]
    ) {
        try {
            const result = await this.fetchColsByCol(
                "email",
                email,
                colsToFetch
            ) as Pick<TUser, K>;

            if(!result || !colsToFetch.every(item => item in result)) {
                throw new ServerError(
                    `User with email: '${email}' doesn't exists.`,
                    404
                );
            }

            return result;
        } catch(err: unknown) {
            if(err instanceof ServerError) {
                throw err;
            }

            throw new ServerError(
                "Something went wrong, Please try after sometime.",
                500
            );
        }
    }
}