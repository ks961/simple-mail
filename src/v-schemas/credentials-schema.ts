import { Validator, type VInfer } from "@d3vtool/utils";

const credsSchema = {
    email: Validator.string().email(),
    password: Validator.string().password()
} 

export const signupValidator = Validator.object(credsSchema);


export type SignupCreds = VInfer<typeof signupValidator>;

export const loginValidator = Validator.object(credsSchema);

export type LoginCreds = VInfer<typeof loginValidator>;