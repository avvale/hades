export class UpdatePermissionCommand 
{
    constructor(
        public readonly id: string,
        public readonly moduleId?: string,
        public readonly name?: string,
        
    ) {}
}