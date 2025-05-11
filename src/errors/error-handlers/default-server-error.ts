import type { KazeContext } from "@d3vtool/kazejs";
import { isInDevelopmentMode } from "../../libs/utils";
import { ServerError } from "../error-classes/server-error";


export function defaultServerError(
    ctx: KazeContext, 
    error: unknown
) {

    if(error instanceof ServerError) {
        ctx.res.statusCode(error.statusCode);

        ctx.res.json({
            status: "error",
            error: "ServerError",
            message: error.errorMsg,
            stackTrace: 
                isInDevelopmentMode() && (error instanceof Error) ? 
                    error.stack : undefined
        });
        return;
    }

    ctx.res.statusCode(500);
    
    ctx.res.json({
        status: "error",
        error: "Unknown",
        message: "Something went wrong!",
        stackTrace: 
            isInDevelopmentMode() && (error instanceof Error) ? 
                error.stack : undefined
    });
}
