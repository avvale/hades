export class DeletedClientEvent
{
    constructor(
        public readonly id: string,
        public readonly grantType: string,
        public readonly name: string,
        public readonly secret: string,
        public readonly authUrl: string,
        public readonly redirect: string,
        public readonly applicationCodes: any,
        public readonly expiredAccessToken: number,
        public readonly expiredRefreshToken: number,
        public readonly isRevoked: boolean,
        public readonly isMaster: boolean,
        public readonly applicationIds: string[],
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}