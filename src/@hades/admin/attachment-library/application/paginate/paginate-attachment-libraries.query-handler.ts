import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateAttachmentLibrariesQuery } from './paginate-attachment-libraries.query';
import { PaginateAttachmentLibrariesService } from './paginate-attachment-libraries.service';

@QueryHandler(PaginateAttachmentLibrariesQuery)
export class PaginateAttachmentLibrariesQueryHandler implements IQueryHandler<PaginateAttachmentLibrariesQuery>
{
    constructor(
        private readonly paginateAttachmentLibrariesService: PaginateAttachmentLibrariesService,
    ) {}

    async execute(query: PaginateAttachmentLibrariesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAttachmentLibrariesService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}