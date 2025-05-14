import { type KazeContext } from "@d3vtool/kazejs";
import { ObjectValidationError } from "@d3vtool/kazejs/validator";
import { defaultServerError } from "../../errors/error-handlers/default-server-error";
import { validationError } from "../../errors/error-handlers/validation-error";




export function mailErrorHanlder(
    ctx: KazeContext,
    error: unknown
) {

    if(error instanceof ObjectValidationError) {
        return validationError(
            ctx,
            error,
            400
        );
    }

    defaultServerError(
        ctx,
        error
    );
}