export class UpdatedAttachmentFamilyEvent
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly width: number,
        public readonly height: number,
        public readonly fit: string,
        public readonly sizes: any,
        public readonly quality: number,
        public readonly format: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}