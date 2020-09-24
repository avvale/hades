import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateTenantsQuery } from './paginate-tenants.query';
import { PaginateTenantsService } from './paginate-tenants.service';

@QueryHandler(PaginateTenantsQuery)
export class PaginateTenantsQueryHandler implements IQueryHandler<PaginateTenantsQuery>
{
    constructor(
        private readonly paginateTenantsService: PaginateTenantsService
    ) { }

    async execute(query: PaginateTenantsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateTenantsService.main(query.queryStatement, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}