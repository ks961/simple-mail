import { Validator, type VInfer } from "@d3vtool/kazejs/validator";

export const mailSchema = {
    from: Validator.string().minLength(5), 
    toMail: Validator.string().email(), 
    subject: Validator.string().minLength(10), 
    body: Validator.string().minLength(10)
}

export const mailValidator = Validator.object(mailSchema);

export type TMailSchema = VInfer<typeof mailValidator>;