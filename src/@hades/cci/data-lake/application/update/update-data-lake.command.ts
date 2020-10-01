export class UpdateDataLakeCommand 
{
    constructor(
        public readonly id: string,
        public readonly tenantId?: string,
        public readonly executionId?: string,
        public readonly tenantCode?: string,
        public readonly payload?: any,
        
    ) {}
}