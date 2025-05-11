import type { KazeContext, KazeNextFunction } from "@d3vtool/kazejs";
import { ServerError } from "../errors/error-classes/server-error";
import { IdentityService } from "../services/identity-service";


export async function authMiddleware(
    ctx: KazeContext,
    next: KazeNextFunction
) {
    const authHeader = ctx.req.headers['Authorization'] as string;

    const token = authHeader?.split(" ")[1]?.trim();

    if(!token) {
        throw new ServerError(
            "Auth token not found.",
            401
        );
    }

    const claims = await IdentityService.verifyJwt(token);

    (ctx.req as any).claims = claims;

    next();
}