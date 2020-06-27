export class InsertPermissionsCommand 
{
    constructor(
        public readonly permissions: {
            id: string,
            moduleId: string,
            name: string,
            
        } []
    ) {}
}