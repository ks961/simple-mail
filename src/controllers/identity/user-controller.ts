import { loginHandler, signupHandler } from "./error-handlers";
import { IdentityService } from "../../services/identity-service";
import { loginValidator, signupValidator } from "../../v-schemas/credentials-schema";
import { defaultServerError } from "../../errors/error-handlers/default-server-error";
import {
    Post, 
    Middlewares, 
    ParentRoute, 
    ErrorHandler, 
    jsonValidate, 
    type KazeContext
} from "@d3vtool/kazejs";

@ParentRoute("/users")
@ErrorHandler(defaultServerError)
export class UserController {


    @Post("/signup")
    @Middlewares(
        jsonValidate(signupValidator)
    )
    @ErrorHandler(signupHandler)
    public static async signup(
        ctx: KazeContext
    ) {
        const creds = ctx.req.body;

        await IdentityService.create(creds);

        ctx.res.statusCode(201);

        ctx.res.json({
            status: "success"
        });
    }

    @Post("/login")
    @Middlewares(
        jsonValidate(
            loginValidator
        )
    )
    @ErrorHandler(loginHandler)
    public static async login(
        ctx: KazeContext
    ) {
        const loginCreds = ctx.req.body;

        const userInfo = await IdentityService.authenticateUser(loginCreds);

        const jwtToken = await IdentityService.generateJwtFor(
            ctx.req.headers["host"]!,
            loginCreds.email,
            userInfo
        );
        
        ctx.res.json({
            status: "success",
            token: jwtToken
        });
    }

}