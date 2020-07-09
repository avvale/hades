export class CreatedSessionEvent
{
    constructor(
        public readonly id: string,
        public readonly ip: string,
        public readonly tagId: string,
        public readonly uid: string,
        public readonly counter: number,
        public readonly expiredAt: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}