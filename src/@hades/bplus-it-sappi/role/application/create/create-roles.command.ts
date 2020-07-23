export class CreateRolesCommand 
{
    constructor(
        public readonly roles: {
            id: string,
            tenantId: string,
            tenantCode: string,
            name: string,
            
        } []
    ) {}
}