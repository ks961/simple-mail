import { ErrorHandler, jsonValidate, Middlewares, ParentRoute, Post, type KazeContext } from "@d3vtool/kazejs";
import { mailValidator, type TMailSchema } from "../../v-schemas/mail-body-schema";
import { mailErrorHanlder } from "./error-handler";
import { mailService } from "../../services/mail-service";
import { ServerError } from "../../errors/error-classes/server-error";


export class MailController {

    @Post("/mail")
    @Middlewares(
        jsonValidate(
            mailValidator
        )
    )
    @ErrorHandler(mailErrorHanlder)
    static async mail(
        ctx: KazeContext
    ) {
        const mailInfo = ctx.req.body as TMailSchema;

        await mailService.sendMail(
            mailInfo.from,
            mailInfo.toMail,
            mailInfo.subject,
            mailInfo.body
        );

        ctx.res.json({
            status: "success"
        });
    }
}