export class CreateActionsCommand 
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