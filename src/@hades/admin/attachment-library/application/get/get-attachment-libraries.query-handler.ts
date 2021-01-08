import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AttachmentLibraryResponse } from './../../domain/attachment-library.response';
import { AttachmentLibraryMapper } from './../../domain/attachment-library.mapper';
import { GetAttachmentLibrariesQuery } from './get-attachment-libraries.query';
import { GetAttachmentLibrariesService } from './get-attachment-libraries.service';

@QueryHandler(GetAttachmentLibrariesQuery)
export class GetAttachmentLibrariesQueryHandler implements IQueryHandler<GetAttachmentLibrariesQuery>
{
    private readonly mapper: AttachmentLibraryMapper = new AttachmentLibraryMapper();

    constructor(
        private readonly getAttachmentLibrariesService: GetAttachmentLibrariesService,
    ) {}

    async execute(query: GetAttachmentLibrariesQuery): Promise<AttachmentLibraryResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getAttachmentLibrariesService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}