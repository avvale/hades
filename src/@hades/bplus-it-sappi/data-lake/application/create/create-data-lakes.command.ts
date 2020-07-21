export class CreateDataLakesCommand 
{
    constructor(
        public readonly dataLakes: {
            id: string,
            data: any,
            
        } []
    ) {}
}