export class InsertResourcesCommand 
{
    constructor(
        public readonly resources: {
            id: string,
            boundedContextId: string,
            name: string,
            hasCustomFields: boolean,
            hasAttachments: boolean,
            
        } []
    ) {}
}