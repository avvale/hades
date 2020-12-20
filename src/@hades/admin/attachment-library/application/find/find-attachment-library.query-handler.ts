import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AttachmentLibraryResponse } from './../../domain/attachment-library.response';
import { AttachmentLibraryMapper } from './../../domain/attachment-library.mapper';
import { FindAttachmentLibraryQuery } from './find-attachment-library.query';
import { FindAttachmentLibraryService } from './find-attachment-library.service';

@QueryHandler(FindAttachmentLibraryQuery)
export class FindAttachmentLibraryQueryHandler implements IQueryHandler<FindAttachmentLibraryQuery>
{
    private readonly mapper: AttachmentLibraryMapper = new AttachmentLibraryMapper();

    constructor(
        private readonly findAttachmentLibraryService: FindAttachmentLibraryService,
    ) {}

    async execute(query: FindAttachmentLibraryQuery): Promise<AttachmentLibraryResponse>
    {
        const attachmentLibrary = await this.findAttachmentLibraryService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(attachmentLibrary);
    }
}