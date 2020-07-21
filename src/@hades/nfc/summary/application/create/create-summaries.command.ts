export class CreateSummariesCommand 
{
    constructor(
        public readonly summaries: {
            id: string,
            tagId: string,
            tenantId: string,
            accessAt: string,
            counter: number,
            
        } []
    ) {}
}