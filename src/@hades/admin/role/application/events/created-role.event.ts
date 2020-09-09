export class CreatedRoleEvent
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly isMaster: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        
    ) {}
}