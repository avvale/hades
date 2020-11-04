import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateChannelsQuery } from './paginate-channels.query';
import { PaginateChannelsService } from './paginate-channels.service';

@QueryHandler(PaginateChannelsQuery)
export class PaginateChannelsQueryHandler implements IQueryHandler<PaginateChannelsQuery>
{
    constructor(
        private readonly paginateChannelsService: PaginateChannelsService,
    ) {}

    async execute(query: PaginateChannelsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateChannelsService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}