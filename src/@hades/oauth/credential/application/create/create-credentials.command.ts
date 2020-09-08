export class CreateCredentialsCommand
{
    constructor(
        public readonly langs: {
            username: string,
            password: string,
            grantType: GrantType
        } []
    ) {}
}