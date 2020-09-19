import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateAccessTokensQuery } from './paginate-access-tokens.query';
import { PaginateAccessTokensService } from './paginate-access-tokens.service';

@QueryHandler(PaginateAccessTokensQuery)
export class PaginateAccessTokensQueryHandler implements IQueryHandler<PaginateAccessTokensQuery>
{
    constructor(
        private readonly paginateAccessTokensService: PaginateAccessTokensService
    ) { }

    async execute(query: PaginateAccessTokensQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateAccessTokensService.main(query.queryStatement, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}