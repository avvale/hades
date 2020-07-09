export class ActionResponse 
{
    constructor(
        public readonly id: string,
        public readonly tagId: string,
        public readonly type: string,
        public readonly sectionId: string,
        public readonly data: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}