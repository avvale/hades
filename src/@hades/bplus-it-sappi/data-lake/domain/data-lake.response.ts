export class DataLakeResponse 
{
    constructor(
        public readonly id: string,
        public readonly data: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}