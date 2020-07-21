export class CreateRolesCommand 
{
    constructor(
        public readonly roles: {
            id: string,
            tenantId: string,
            name: string,
            
        } []
    ) {}
}