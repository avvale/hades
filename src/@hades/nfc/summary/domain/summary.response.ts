export class SummaryResponse 
{
    constructor(
        public readonly id: string,
        public readonly tagId: string,
        public readonly tenantId: string,
        public readonly accessAt: string,
        public readonly counter: number,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}