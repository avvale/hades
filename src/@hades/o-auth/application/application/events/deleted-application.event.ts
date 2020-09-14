export class DeletedApplicationEvent
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly code: string,
        public readonly secret: string,
        public readonly isMaster: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}