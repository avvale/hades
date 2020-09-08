export class CreateCredentialCommand
{
    constructor(
        public readonly credential: {
            username: string,
            password: string,
            grantType: string
        }
    ) {}
}