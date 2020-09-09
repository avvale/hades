export class ApplicationResponse 
{
    constructor(
        public readonly id: string,
        public readonly code: string,
        public readonly secret: string,
        public readonly name: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}