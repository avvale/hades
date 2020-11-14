import { BoundedContextResponse } from '@hades/iam/bounded-context/domain/bounded-context.response';
import { AttachmentFamilyResponse } from '@hades/admin/attachment-family/domain/attachment-family.response';

export class ResourceResponse
{
    constructor(
        public readonly id: string,
        public readonly boundedContextId: string,
        public readonly attachmentFamilyIds: string[],
        public readonly name: string,
        public readonly hasCustomFields: boolean,
        public readonly hasAttachments: boolean,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
        public readonly boundedContext: BoundedContextResponse,
        public readonly attachmentFamilies: AttachmentFamilyResponse[],
    ) {}
}