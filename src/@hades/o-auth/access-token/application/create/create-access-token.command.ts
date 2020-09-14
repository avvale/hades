export class CreateAccessTokenCommand 
{   
    constructor(
        public readonly id: string,
        public readonly clientId: string,
        public readonly token: string,
        public readonly name: string,
        public readonly isRevoked: boolean,
        public readonly expiresAt: string,
        
    ) {}
}