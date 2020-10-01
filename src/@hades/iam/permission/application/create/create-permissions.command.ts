export class CreatePermissionsCommand
{
    constructor(
        public readonly permissions: {
            id: string,
            name: string,
            boundedContextId: string,
            roleIds?: string[],
            
        } []
    ) {}
}