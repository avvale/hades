import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateExecutionsQuery } from './paginate-executions.query';
import { PaginateExecutionsService } from './paginate-executions.service';

@QueryHandler(PaginateExecutionsQuery)
export class PaginateExecutionsQueryHandler implements IQueryHandler<PaginateExecutionsQuery>
{
    constructor(
        private readonly paginateExecutionsService: PaginateExecutionsService
    ) { }

    async execute(query: PaginateExecutionsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateExecutionsService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}