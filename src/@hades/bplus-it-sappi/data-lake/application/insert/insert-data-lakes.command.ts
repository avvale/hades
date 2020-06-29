export class InsertDataLakesCommand 
{
    constructor(
        public readonly dataLakes: {
            id: string,
            data: any,
            
        } []
    ) {}
}