export class CreateRoleCommand 
{   
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly isMaster: boolean,
        
    ) {}
}