import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AttachmentResponse } from './../../domain/attachment.response';
import { AttachmentMapper } from './../../domain/attachment.mapper';
import { FindAttachmentQuery } from './find-attachment.query';
import { FindAttachmentService } from './find-attachment.service';

@QueryHandler(FindAttachmentQuery)
export class FindAttachmentQueryHandler implements IQueryHandler<FindAttachmentQuery>
{
    private readonly mapper: AttachmentMapper = new AttachmentMapper();

    constructor(
        private readonly findAttachmentService: FindAttachmentService,
    ) {}

    async execute(query: FindAttachmentQuery): Promise<AttachmentResponse>
    {
        const attachment = await this.findAttachmentService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(attachment);
    }
}