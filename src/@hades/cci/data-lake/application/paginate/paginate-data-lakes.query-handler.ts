import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateDataLakesQuery } from './paginate-data-lakes.query';
import { PaginateDataLakesService } from './paginate-data-lakes.service';

@QueryHandler(PaginateDataLakesQuery)
export class PaginateDataLakesQueryHandler implements IQueryHandler<PaginateDataLakesQuery>
{
    constructor(
        private readonly paginateDataLakesService: PaginateDataLakesService
    ) { }

    async execute(query: PaginateDataLakesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateDataLakesService.main(query.queryStatement, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}