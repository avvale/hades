import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateModulesQuery } from './paginate-modules.query';
import { PaginateModulesService } from './paginate-modules.service';

@QueryHandler(PaginateModulesQuery)
export class PaginateModulesQueryHandler implements IQueryHandler<PaginateModulesQuery>
{
    constructor(
        private readonly paginateModulesService: PaginateModulesService
    ) { }

    async execute(query: PaginateModulesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateModulesService.main(query.queryStatement, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}