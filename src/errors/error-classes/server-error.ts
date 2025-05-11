

export class ServerError extends Error {
    constructor(
        public errorMsg: string,
        public statusCode: number
    ) {
        super();
    }
}