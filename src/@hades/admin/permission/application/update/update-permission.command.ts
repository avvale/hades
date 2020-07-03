export class UpdatePermissionCommand 
{
    constructor(
        public readonly id: string,
        public readonly boundedContextId?: string,
        public readonly name?: string,
        
    ) {}
}