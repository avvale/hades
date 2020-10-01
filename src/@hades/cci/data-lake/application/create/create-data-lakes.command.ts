export class CreateDataLakesCommand
{
    constructor(
        public readonly dataLakes: {
            id: string,
            tenantId: string,
            executionId: string,
            tenantCode: string,
            payload: any,
            
        } []
    ) {}
}