import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AttachmentLibraryResponse } from './../../domain/attachment-library.response';
import { AttachmentLibraryMapper } from './../../domain/attachment-library.mapper';
import { GetAttachmentLibraryQuery } from './get-attachment-library.query';
import { GetAttachmentLibraryService } from './get-attachment-library.service';

@QueryHandler(GetAttachmentLibraryQuery)
export class GetAttachmentLibraryQueryHandler implements IQueryHandler<GetAttachmentLibraryQuery>
{
    private readonly mapper: AttachmentLibraryMapper = new AttachmentLibraryMapper();

    constructor(
        private readonly getAttachmentLibraryService: GetAttachmentLibraryService,
    ) {}

    async execute(query: GetAttachmentLibraryQuery): Promise<AttachmentLibraryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAttachmentLibraryService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}