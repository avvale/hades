export class InsertPermissionsCommand 
{
    constructor(
        public readonly permissions: {
            id: string,
            boundedContextId: string,
            name: string,
            
        } []
    ) {}
}