export class UpdateRefreshTokenCommand 
{
    constructor(
        public readonly id: string,
        public readonly accessTokenId?: string,
        public readonly token?: string,
        public readonly isRevoked?: boolean,
        public readonly expiresAt?: string,
        
    ) {}
}