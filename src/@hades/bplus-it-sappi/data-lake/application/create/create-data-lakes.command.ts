export class CreateDataLakesCommand 
{
    constructor(
        public readonly dataLakes: {
            id: string,
            tenantId: string,
            tenantCode: string,
            data: any,
            
        } []
    ) {}
}