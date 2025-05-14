import { type KazeContext } from "@d3vtool/kazejs";
import {
    Post, 
    Middlewares,
    ErrorHandler
} from "@d3vtool/kazejs/kaze-class";

import {
    jsonValidate
} from "@d3vtool/kazejs/validator";
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