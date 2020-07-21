export class CreatePermissionsCommand 
{
    constructor(
        public readonly permissions: {
            id: string,
            boundedContextId: string,
            name: string,
            
        } []
    ) {}
}