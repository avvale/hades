export class CreateSystemCommand 
{   
    constructor(
        public readonly id: string,
        public readonly tenantId: string,
        public readonly name: string,
        public readonly tenantCode: string,
        public readonly environment: string,
        public readonly version: string,
        public readonly isActive: boolean,
        public readonly cancelledAt: string,
        
    ) {}
}