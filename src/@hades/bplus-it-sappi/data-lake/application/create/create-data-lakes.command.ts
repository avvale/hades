export class CreateDataLakesCommand 
{
    constructor(
        public readonly dataLakes: {
            id: string,
            executionId: string,
            tenantId: string,
            tenantCode: string,
            payload: any,
            
        } []
    ) {}
}