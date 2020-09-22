export class CredentialResponse 
{
    constructor(
        public readonly grantType: string,
        public readonly username: string,
        public readonly password: string,
        public readonly accessTokenId: string,
        public readonly refreshToken: string,
        public readonly clientSecret: string,
        public readonly redirect: string,
    ) {}
}