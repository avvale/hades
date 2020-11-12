export class DeletedResourceEvent
{
    constructor(
        public readonly id: string,
        public readonly boundedContextId: string,
        public readonly name: string,
        public readonly hasCustomFields: boolean,
        public readonly hasAttachments: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}