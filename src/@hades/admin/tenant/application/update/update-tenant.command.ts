export class UpdateTenantCommand 
{
    constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly code?: string,
        public readonly logo?: string,
        public readonly isActive?: boolean,
        public readonly data?: any,
        
    ) {}
}