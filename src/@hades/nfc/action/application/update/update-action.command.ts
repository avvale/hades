export class UpdateActionCommand 
{
    constructor(
        public readonly id: string,
        public readonly tagId?: string,
        public readonly type?: string,
        public readonly sectionId?: string,
        public readonly data?: any,
        
    ) {}
}