export class CreateRoleCommand 
{   
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly name: string,
        
    ) {}
}