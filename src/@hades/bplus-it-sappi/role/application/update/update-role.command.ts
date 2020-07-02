export class UpdateRoleCommand 
{
    constructor(
        public readonly id: string,
        public readonly tenantId?: string,
        public readonly name?: string,
        
    ) {}
}