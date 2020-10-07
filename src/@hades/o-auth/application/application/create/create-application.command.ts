export class CreateApplicationCommand 
{   
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly code: string,
        public readonly secret: string,
        public readonly isMaster: boolean,
        public readonly clientIds: string[],
        
    ) {}
}