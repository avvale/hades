export class CreateRefreshTokensCommand
{
    constructor(
        public readonly refreshTokens: {
            id: string,
            accessTokenId: string,
            token: string,
            isRevoked: boolean,
            expiresAt?: string,
            
        } []
    ) {}
}