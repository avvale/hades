import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AttachmentFamilyResponse } from './../../domain/attachment-family.response';
import { AttachmentFamilyMapper } from './../../domain/attachment-family.mapper';
import { FindAttachmentFamilyQuery } from './find-attachment-family.query';
import { FindAttachmentFamilyService } from './find-attachment-family.service';

@QueryHandler(FindAttachmentFamilyQuery)
export class FindAttachmentFamilyQueryHandler implements IQueryHandler<FindAttachmentFamilyQuery>
{
    private readonly mapper: AttachmentFamilyMapper = new AttachmentFamilyMapper();

    constructor(
        private readonly findAttachmentFamilyService: FindAttachmentFamilyService,
    ) {}

    async execute(query: FindAttachmentFamilyQuery): Promise<AttachmentFamilyResponse>
    {
        const attachmentFamily = await this.findAttachmentFamilyService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(attachmentFamily);
    }
}