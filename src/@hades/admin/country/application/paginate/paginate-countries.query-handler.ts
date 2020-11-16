import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateCountriesQuery } from './paginate-countries.query';
import { PaginateCountriesService } from './paginate-countries.service';

@QueryHandler(PaginateCountriesQuery)
export class PaginateCountriesQueryHandler implements IQueryHandler<PaginateCountriesQuery>
{
    constructor(
        private readonly paginateCountriesService: PaginateCountriesService,
    ) {}

    async execute(query: PaginateCountriesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateCountriesService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}