import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateAttachmentLibraryQuery } from './paginate-attachment-library.query';
import { PaginateAttachmentLibraryService } from './paginate-attachment-library.service';

@QueryHandler(PaginateAttachmentLibraryQuery)
export class PaginateAttachmentLibraryQueryHandler implements IQueryHandler<PaginateAttachmentLibraryQuery>
{
    constructor(
        private readonly paginateAttachmentLibraryService: PaginateAttachmentLibraryService,
    ) {}

    async execute(query: PaginateAttachmentLibraryQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAttachmentLibraryService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}