export class CreatedAttachmentLibraryEvent
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly pathname: string,
        public readonly filename: string,
        public readonly url: string,
        public readonly mime: string,
        public readonly extension: string,
        public readonly size: number,
        public readonly width: number,
        public readonly height: number,
        public readonly data: any,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}