import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateRefreshTokensQuery } from './paginate-refresh-tokens.query';
import { PaginateRefreshTokensService } from './paginate-refresh-tokens.service';

@QueryHandler(PaginateRefreshTokensQuery)
export class PaginateRefreshTokensQueryHandler implements IQueryHandler<PaginateRefreshTokensQuery>
{
    constructor(
        private readonly paginateRefreshTokensService: PaginateRefreshTokensService
    ) { }

    async execute(query: PaginateRefreshTokensQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateRefreshTokensService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}