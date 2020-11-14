import { ResourceResponse } from '@hades/admin/resource/domain/resource.response';

export class AttachmentFamilyResponse
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly resourceIds: string[],
        public readonly width: number,
        public readonly height: number,
        public readonly fit: string,
        public readonly sizes: any,
        public readonly quality: number,
        public readonly format: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly resources: ResourceResponse[],
    ) {}
}