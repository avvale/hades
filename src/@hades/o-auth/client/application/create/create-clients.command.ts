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
            expiredAccessToken?: number,
            expiredRefreshToken?: number,
            isActive: boolean,
            isMaster: boolean,
            applicationIds?: string[],
            
        } []
    ) {}
}