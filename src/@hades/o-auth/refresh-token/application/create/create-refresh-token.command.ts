export class CreateRefreshTokenCommand 
{   
    constructor(
        public readonly id: string,
        public readonly accessTokenId: string,
        public readonly expiredRefreshToken: number
    ) {}
}