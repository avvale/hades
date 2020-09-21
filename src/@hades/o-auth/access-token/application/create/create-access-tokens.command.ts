export class CreateAccessTokensCommand
{
    constructor(
        public readonly accessTokens: {
            id: string,
            clientId: string,
            token: string,
            name?: string,
            isRevoked: boolean,
            expiresAt?: number,
            
        } []
    ) {}
}