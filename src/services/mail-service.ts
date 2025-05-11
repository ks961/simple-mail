import { MAIL } from "../config";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { ServerError } from "../errors/error-classes/server-error";

class MailService {
    #transporter;

    constructor(service: string) {
        
        this.#transporter = nodemailer.createTransport({
            service: service,
            auth: {
                user: MAIL.user,
                pass: MAIL.pass
            }
        });
    }

    async sendMail(
        from: string, 
        toMail: string, 
        subject: string, 
        body: string
    ) {
        const mailOptions: Mail.Options = {
            from: `${from} <${process.env.MAIL_ID}>`,
            to: toMail,
            subject: subject.trim(),
            html: body.trim(),
        };

        try {

            await this.#transporter.sendMail(mailOptions);

        } catch {
            throw new ServerError(
                "Something went wrong while sending mail.",
                500
            );
        }
    }

}

export const mailService = new MailService("gmail");