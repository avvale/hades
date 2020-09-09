export class CreateCredentialCommand
{
    constructor(
        public readonly username: string,
        public readonly password: string,
        public readonly grantType: string,
    ) {}
}