import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AttachmentFamilyResponse } from './../../domain/attachment-family.response';
import { AttachmentFamilyMapper } from './../../domain/attachment-family.mapper';
import { AttachmentFamilyId } from './../../domain/value-objects';
import { FindAttachmentFamilyByIdQuery } from './find-attachment-family-by-id.query';
import { FindAttachmentFamilyByIdService } from './find-attachment-family-by-id.service';

@QueryHandler(FindAttachmentFamilyByIdQuery)
export class FindAttachmentFamilyByIdQueryHandler implements IQueryHandler<FindAttachmentFamilyByIdQuery>
{
    private readonly mapper: AttachmentFamilyMapper = new AttachmentFamilyMapper();

    constructor(
        private readonly findAttachmentFamilyByIdService: FindAttachmentFamilyByIdService,
    ) {}

    async execute(query: FindAttachmentFamilyByIdQuery): Promise<AttachmentFamilyResponse>
    {
        const attachmentFamily = await this.findAttachmentFamilyByIdService.main(
            new AttachmentFamilyId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(attachmentFamily);
    }
}