import type { KazeContext } from "@d3vtool/kazejs";
import { isInDevelopmentMode } from "../../libs/utils";
import type { ObjectValidationError } from "@d3vtool/utils";


export function validationError(
    ctx: KazeContext,
    error: ObjectValidationError,
    statusCode: number = 400
) {
    const response = {
        status: "error",
        message: `Key ${error.key}: ${error.message}`,
        stackTrace: isInDevelopmentMode() ?  error.stack : undefined
    }

    ctx.res.statusCode(statusCode);

    ctx.res.json(response);
}