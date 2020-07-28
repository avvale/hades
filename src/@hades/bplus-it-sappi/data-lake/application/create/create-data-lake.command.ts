export class CreateDataLakeCommand 
{   
    constructor(
        public readonly id: string,
        public readonly executionId: string,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly payload: any,
        
    ) {}
}