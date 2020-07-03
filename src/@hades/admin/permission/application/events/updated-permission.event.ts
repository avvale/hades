export class UpdatedPermissionEvent
{
    constructor(
        public readonly id: string,
        public readonly boundedContextId: string,
        public readonly name: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}