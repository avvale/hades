export class InsertActionsCommand 
{
    constructor(
        public readonly actions: {
            id: string,
            tagId: string,
            type: string,
            sectionId?: string,
            data?: any,
            
        } []
    ) {}
}