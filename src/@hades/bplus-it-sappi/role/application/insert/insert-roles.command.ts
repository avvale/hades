export class InsertRolesCommand 
{
    constructor(
        public readonly roles: {
            id: string,
            tenantId: string,
            name: string,
            
        } []
    ) {}
}