export class CreateClientsCommand
{
    constructor(
        public readonly clients: {
            id: string,
            grantType: string,
            name: string,
            secret: string,
            authUrl?: string,
            redirect?: string,
            resourceCodes: any,
            expiredAccessToken?: number,
            expiredRefreshToken?: number,
            isRevoked: boolean,
            isMaster: boolean,
            
        } []
    ) {}
}