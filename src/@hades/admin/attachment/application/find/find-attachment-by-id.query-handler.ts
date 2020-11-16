import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AttachmentResponse } from './../../domain/attachment.response';
import { AttachmentMapper } from './../../domain/attachment.mapper';
import { AttachmentId } from './../../domain/value-objects';
import { FindAttachmentByIdQuery } from './find-attachment-by-id.query';
import { FindAttachmentByIdService } from './find-attachment-by-id.service';

@QueryHandler(FindAttachmentByIdQuery)
export class FindAttachmentByIdQueryHandler implements IQueryHandler<FindAttachmentByIdQuery>
{
    private readonly mapper: AttachmentMapper = new AttachmentMapper();

    constructor(
        private readonly findAttachmentByIdService: FindAttachmentByIdService,
    ) {}

    async execute(query: FindAttachmentByIdQuery): Promise<AttachmentResponse>
    {
        const attachment = await this.findAttachmentByIdService.main(
            new AttachmentId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(attachment);
    }
}