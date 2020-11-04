import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateMessagesOverviewQuery } from './paginate-messages-overview.query';
import { PaginateMessagesOverviewService } from './paginate-messages-overview.service';

@QueryHandler(PaginateMessagesOverviewQuery)
export class PaginateMessagesOverviewQueryHandler implements IQueryHandler<PaginateMessagesOverviewQuery>
{
    constructor(
        private readonly paginateMessagesOverviewService: PaginateMessagesOverviewService,
    ) {}

    async execute(query: PaginateMessagesOverviewQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateMessagesOverviewService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}