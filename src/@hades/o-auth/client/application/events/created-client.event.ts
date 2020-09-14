export class CreatedClientEvent
{
    constructor(
        public readonly id: string,
        public readonly grantType: string,
        public readonly name: string,
        public readonly secret: string,
        public readonly authUrl: string,
        public readonly redirect: string,
        public readonly resourceCodes: any,
        public readonly expiredAccessToken: number,
        public readonly expiredRefreshToken: number,
        public readonly isRevoked: boolean,
        public readonly isMaster: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}