export class CreateAccessTokenCommand 
{   
    constructor(
        public readonly id: string,
        public readonly clientId: string,
        public readonly accountId: string,
        public readonly name: string,
        public readonly expiredAccessToken: number
        
    ) {}
}