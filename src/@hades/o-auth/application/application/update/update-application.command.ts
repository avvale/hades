export class UpdateApplicationCommand 
{
    constructor(
        public readonly id: string,
        public readonly code?: string,
        public readonly secret?: string,
        public readonly name?: string,
        
    ) {}
}