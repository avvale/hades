export class CreatePermissionCommand 
{   
    constructor(
        public readonly id: string,
        public readonly boundedContextId: string,
        public readonly name: string,
        
    ) {}
}