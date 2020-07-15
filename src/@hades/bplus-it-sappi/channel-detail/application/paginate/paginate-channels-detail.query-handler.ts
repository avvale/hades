import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateChannelsDetailQuery } from './paginate-channels-detail.query';
import { PaginateChannelsDetailService } from './paginate-channels-detail.service';

@QueryHandler(PaginateChannelsDetailQuery)
export class PaginateChannelsDetailQueryHandler implements IQueryHandler<PaginateChannelsDetailQuery>
{
    constructor(
        private readonly paginateChannelsDetailService: PaginateChannelsDetailService
    ) { }

    async execute(query: PaginateChannelsDetailQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateChannelsDetailService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}