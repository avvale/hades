import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateAttachmentsQuery } from './paginate-attachments.query';
import { PaginateAttachmentsService } from './paginate-attachments.service';

@QueryHandler(PaginateAttachmentsQuery)
export class PaginateAttachmentsQueryHandler implements IQueryHandler<PaginateAttachmentsQuery>
{
    constructor(
        private readonly paginateAttachmentsService: PaginateAttachmentsService,
    ) {}

    async execute(query: PaginateAttachmentsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAttachmentsService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}