export class CreateModuleCommand 
{   
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly root: string,
        public readonly sort: number,
        public readonly isActive: boolean,
        
    ) {}
}