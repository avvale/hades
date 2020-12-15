import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AttachmentLibraryResponse } from './../../domain/attachment-library.response';
import { AttachmentLibraryMapper } from './../../domain/attachment-library.mapper';
import { AttachmentLibraryId } from './../../domain/value-objects';
import { FindAttachmentLibraryByIdQuery } from './find-attachment-library-by-id.query';
import { FindAttachmentLibraryByIdService } from './find-attachment-library-by-id.service';

@QueryHandler(FindAttachmentLibraryByIdQuery)
export class FindAttachmentLibraryByIdQueryHandler implements IQueryHandler<FindAttachmentLibraryByIdQuery>
{
    private readonly mapper: AttachmentLibraryMapper = new AttachmentLibraryMapper();

    constructor(
        private readonly findAttachmentLibraryByIdService: FindAttachmentLibraryByIdService,
    ) {}

    async execute(query: FindAttachmentLibraryByIdQuery): Promise<AttachmentLibraryResponse>
    {
        const attachmentLibrary = await this.findAttachmentLibraryByIdService.main(
            new AttachmentLibraryId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(attachmentLibrary);
    }
}