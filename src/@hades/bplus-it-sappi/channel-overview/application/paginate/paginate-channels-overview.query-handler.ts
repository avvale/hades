import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateChannelsOverviewQuery } from './paginate-channels-overview.query';
import { PaginateChannelsOverviewService } from './paginate-channels-overview.service';

@QueryHandler(PaginateChannelsOverviewQuery)
export class PaginateChannelsOverviewQueryHandler implements IQueryHandler<PaginateChannelsOverviewQuery>
{
    constructor(
        private readonly paginateChannelsOverviewService: PaginateChannelsOverviewService
    ) { }

    async execute(query: PaginateChannelsOverviewQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateChannelsOverviewService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}