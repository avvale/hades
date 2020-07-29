export class TagResponse 
{
    constructor(
        public readonly id: string,
        public readonly code: number,
        public readonly tenantId: string,
        public readonly tenantCode: string,
        public readonly urlBase: string,
        public readonly params: any,
        public readonly offset: number,
        public readonly isSessionRequired: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}